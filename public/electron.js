const { app, ipcMain, BrowserWindow } = require("electron");
const { join } = require("path");
const { format } = require("url");
const { Twitter } = require("twitter-node-client");
const sqlite3 = require("sqlite3").verbose();
const uuidv1 = require("uuid/v1");
const isDev = require("electron-is-dev");
const auth = require(`oauth-electron-twitter`);
const config = require("./config");

let mainWindow;
let oAuthWindow;
let twitterClient;
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

// Configure twitter-node-client for selected account.

const configTwitterClient = (token, secret) => {
  twitterClient = new Twitter({
    consumerKey: config.key,
    consumerSecret: config.secret,
    accessToken: token,
    accessTokenSecret: secret,
    callBackUrl: "http://localhost"
  });
};

// Twitter oauth sign in listener.

ipcMain.on("twitter-oauth", async event => {
  const response = await createOAuthWindow();
  let uid = uuidv1();

  if (response === "closed window") {
    return event.sender.send("twitter-oauth-response", null);
  }

  db = new sqlite3.Database("./data/users.db");

  db.run(
    "INSERT INTO users(uid, token, token_secret) VALUES((?), (?), (?))",
    [uid, response.token, response.tokenSecret],
    err => err && console.error(err.message)
  );

  db.close(err => err && console.error(err.message));

  configTwitterClient(response.token, response.tokenSecret);

  return event.sender.send("twitter-oauth-response", uid);
});

// Initializing selected account

ipcMain.on("select-acct", (event, uid) => {
  db = new sqlite3.Database("./data/users.db");

  db.each(
    "SELECT token, token_secret FROM users WHERE uid = ?",
    [uid],
    (err, row) => {
      if (err) {
        return console.error(err);
      }

      configTwitterClient(row.token, row.token_secret);

      event.sender.send("selected-acct");
    }
  );

  db.close(err => err && console.error(err.message));
});

// Fetch user listener.

ipcMain.on("fetch-user", event => {
  twitterClient.getCustomApiCall(
    "/account/verify_credentials.json",
    {},
    err => console.error(err),
    res => event.sender.send("fetched-user", res)
  );
});

// Fetch home timeline listener.

ipcMain.on("fetch-timeline", event => {
  twitterClient.getHomeTimeline(
    { count: "20", tweet_mode: "extended" },
    err => console.error(err),
    res => event.sender.send("fetched-timeline", res)
  );
});

// Fetch tweets listener.

ipcMain.on("fetch-tweets", (event, id) => {
  twitterClient.getHomeTimeline(
    { since_id: id, tweet_mode: "extended" },
    err => console.error(err),
    res => event.sender.send("fetched-tweets", res)
  );
});

// Fetch previous tweets listener.

ipcMain.on("fetch-previous-tweets", (event, id) => {
  twitterClient.getHomeTimeline(
    { max_id: id, count: "20", tweet_mode: "extended" },
    err => console.error(err),
    res => event.sender.send("fetched-previous-tweets", res)
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
