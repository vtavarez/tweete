const { app, ipcMain, BrowserWindow } = require("electron");
const { Twitter } = require("twitter-node-client");
const path = require("path");
const endpoint = require("url");
const config = require("./data/twitter_config");

let mainWindow;
let oAuthWindow;

function createMainWindow() {
  const url =
    process.env.DEV_URL ||
    endpoint.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });

  mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    minWidth: 500,
    maxWidth: 500,
    minHeight: 800,
    title: "Tweete",
    icon: path.join(__dirname, "/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "/preload.js")
    }
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(url);
}

function createOAuthWindow() {
  oAuthWindow = new BrowserWindow({
    width: 800,
    height: 800,
    parent: mainWindow,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false
    }
  });

  oAuthWindow.setMenuBarVisibility(false);

  const twitter = new Twitter(config);

  twitter.getOAuthRequestToken(res => {});
}

app.on("ready", createMainWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) createMainWindow();
});

ipcMain.on("twitter-oauth", (event, arg) => {
  createOAuthWindow();
});
