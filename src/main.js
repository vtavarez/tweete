const { app, ipcMain, BrowserWindow } = require("electron");
const auth = require(`oauth-electron-twitter`);
const { join } = require("path");
const { format } = require("url");
const { Twitter } = require("twitter-node-client");
const { LocalStorage } = require("node-localstorage");
const uuidv1 = require("uuid/v1");
const config = require("./data/config");
const localStorage = new LocalStorage("./src/data");

let mainWindow;
let oAuthWindow;
let twitterAPI;

function createMainWindow() {
  const url =
    process.env.DEV_URL ||
    format({
      pathname: join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });

  mainWindow = new BrowserWindow({
    width: 500,
    height: 1000,
    minWidth: 500,
    maxWidth: 500,
    minHeight: 800,
    title: "Tweete",
    icon: join(__dirname, "/icon.png"),
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(url);
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
    const token = await auth.login(config, oAuthWindow);
    oAuthWindow.close();
    return token;
  } catch (error) {
    return error;
  }
}

// Twitter oauth sign in listener.

ipcMain.on("twitter-oauth", async (event, args) => {
  const oAuthResponse = await createOAuthWindow();
  const uid = uuidv1();

  if (oAuthResponse === "closed window") {
    return event.sender.send("twitter-oauth-response", null);
  }

  localStorage.setItem(uid, JSON.stringify(oAuthResponse));

  return event.sender.send("twitter-oauth-response", uid);
});

// Configures twitter-node-client for authenticated user.

function initTwitterApi(uid) {
  const { token, tokenSecret } = JSON.parse(localStorage.getItem(uid));

  const apiConfig = {
    consumerKey: config.key,
    consumerSecret: config.secret,
    accessToken: token,
    accessTokenSecret: tokenSecret,
    callBackUrl: "http://localhost"
  };

  twitterAPI = new Twitter(apiConfig);
}

// Initial user fetch listener.

ipcMain.on("fetch-user", (event, uid) => {
  initTwitterApi(uid);

  const user = new Promise((resolve, reject) => {
    twitterAPI.getCustomApiCall(
      "/account/verify_credentials.json",
      {},
      (err, response, body) => {
        reject(err);
      },
      response => {
        resolve(response);
      }
    );
  });

  user
    .then(data => {
      event.sender.send("fetched-user", data);
    })
    .catch(err => {
      console.log(err);
    });
});

// Fetch home timeline listener.

ipcMain.on("fetch-timeline", event => {
  const timeline = new Promise((resolve, reject) => {
    twitterAPI.getHomeTimeline(
      { count: "20", tweet_mode: "extended" },
      (error, response, body) => {
        reject(error);
      },
      response => {
        resolve(response);
      }
    );
  });

  timeline
    .then(data => {
      event.sender.send("fetched-timeline", data);
    })
    .catch(err => {
      console.log(err);
    });
});

// Fetch tweets listener.

ipcMain.on("fetch-tweets", (event, id) => {
  const tweets = new Promise((resolve, reject) => {
    twitterAPI.getHomeTimeline(
      { since_id: id, tweet_mode: "extended" },
      (error, response, body) => {
        reject(error);
      },
      response => {
        resolve(response);
      }
    );
  });

  tweets
    .then(data => {
      event.sender.send("fetched-tweets", data);
    })
    .catch(err => {
      console.log(err);
    });
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
