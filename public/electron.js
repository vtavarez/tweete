const { app, ipcMain, BrowserWindow } = require("electron");
const { join } = require("path");
const { format } = require("url");
const Twit = require("twit");
const sqlite3 = require("sqlite3").verbose();
const uuidv1 = require("uuid/v1");
const isDev = require("electron-is-dev");
const auth = require("oauth-electron-twitter");
const config = require("./config");

let mainWindow;
let oAuthWindow;
let twitter;
let db;

function createMainWindow() {
  const url = isDev
    ? "http://localhost:3000"
    : format({
        pathname: join(__dirname, "/../build/index.html"),
        protocol: "file:",
        slashes: true
      });

  db = new sqlite3.Database("./data/users.db", sqlite3.OPEN_READWRITE, err =>
    err ? console.error(err.message) : console.log("Connected to database.")
  );

  db.run("CREATE TABLE IF NOT EXISTS users(uid, token, token_secret)");

  db.close(err =>
    err ? console.error(err.message) : console.log("Database closed.")
  );

  mainWindow = new BrowserWindow({
    width: 500,
    height: 1000,
    minWidth: 500,
    maxWidth: 500,
    minHeight: 800,
    title: "Tweete",
    icon: join(__dirname, "/../assets/icon.png"),
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(url);

  mainWindow.once("ready-to-show", () => mainWindow.show());
}

// Init Twitter oauth flow.

async function createOAuthWindow() {
  oAuthWindow = new BrowserWindow({
    width: 800,
    height: 800,
    parent: mainWindow,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  oAuthWindow.setMenuBarVisibility(false);

  try {
    const response = await auth.login(config, oAuthWindow);
    oAuthWindow.close();
    return response;
  } catch (error) {
    return error;
  }
}

// Configure twitter-client for selected account.

const configureTwitterClient = (token, secret) => {
  twitter = new Twit({
    consumer_key: config.key,
    consumer_secret: config.secret,
    access_token: token,
    access_token_secret: secret
  });
};

// Twitter oauth sign in listener.

ipcMain.on("twitter-oauth", async event => {
  const response = await createOAuthWindow();
  let uid = uuidv1();

  if (response === "closed window") {
    return event.sender.send("twitter-oauth-response", null);
  } else {
    const { token, tokenSecret } = response;

    db = new sqlite3.Database("./data/users.db");

    db.run(
      "INSERT INTO users(uid, token, token_secret) VALUES((?), (?), (?))",
      [uid, response.token, response.tokenSecret],
      err => err && console.error(err.message)
    );

    db.close(err => err && console.error(err.message));

    configureTwitterClient(token, tokenSecret);

    return event.sender.send("twitter-oauth-response", uid);
  }
});

// Initializing selected account

ipcMain.on("select-account", (event, uid) => {
  db = new sqlite3.Database("./data/users.db");

  db.each(
    "SELECT token, token_secret FROM users WHERE uid = ?",
    [uid],
    (err, { token, token_secret }) => {
      if (err) {
        return console.error(err.message);
      }

      configureTwitterClient(token, token_secret);

      event.sender.send("selected-account");
    }
  );

  db.close(err => err && console.error(err.message));
});

// Fetch user listener.

ipcMain.on("fetch-user", event => {
  twitter.get("/account/verify_credentials", (err, user) =>
    err ? console.error(err) : event.sender.send("fetched-user", user)
  );
});

// Fetch home timeline listener.

ipcMain.on("fetch-timeline", event => {
  twitter.get(
    "/statuses/home_timeline",
    { count: "20", tweet_mode: "extended" },
    (err, timeline) =>
      err ? console.error(err) : event.sender.send("fetched-timeline", timeline)
  );
});

// Fetch tweets listener.

ipcMain.on("fetch-tweets", (event, id) => {
  twitter.get(
    "/statuses/home_timeline",
    { since_id: id, tweet_mode: "extended" },
    (err, timeline) =>
      err ? console.error(err) : event.sender.send("fetched-tweets", timeline)
  );
});

// Fetch previous tweets listener.

ipcMain.on("fetch-previous-tweets", (event, id) => {
  twitter.get(
    "/statuses/home_timeline",
    { max_id: id, count: "20", tweet_mode: "extended" },
    (err, tweets) =>
      err
        ? console.error(err)
        : event.sender.send("fetched-previous-tweets", tweets)
  );
});

// Like tweet listener

ipcMain.on("like-tweet", (event, id) => {
  twitter.post("/favorites/create", { id }, (err, { favorited }) =>
    err && console.error(err)
  );
});

// Unlike tweet listener

ipcMain.on("unlike-tweet", (event, id) => {
  twitter.post("/favorites/destroy", { id }, (err, { favorited }) =>
    err && console.error(err)
  );
});

app.on("ready", createMainWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createMainWindow();
  }
});
