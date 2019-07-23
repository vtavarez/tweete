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
      nodeIntegration: true,
      preload: join(__dirname, "/preload.js")
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
    return event.sender.send("twitter-oauth-cancelled");
  }

  localStorage.setItem(uid, JSON.stringify(oAuthResponse));

  return event.sender.send("twitter-oauth-completed", uid);
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

  const timeline = new Promise((resolve, reject) => {
    twitterAPI.getHomeTimeline(
      { count: "10" },
      (error, response, body) => {
        reject(error);
      },
      response => {
        resolve(response);
      }
    );
  });

  Promise.all([user, timeline]).then(data => {
    return event.sender.send("fetched-user", data);
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
