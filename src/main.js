const { app, ipcMain, BrowserWindow } = require("electron");
const auth = require(`oauth-electron-twitter`);
const { join } = require("path");
const { format } = require("url");
const config = require("./data/config");

let mainWindow;
let oAuthWindow;

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
    height: 800,
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

  const token = await auth.login(config, oAuthWindow);

  oAuthWindow.close();

  return token;
}

app.on("ready", createMainWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) createMainWindow();
});

ipcMain.on("twitter-oauth", async (event, arg) => {
  const token = await createOAuthWindow();
  event.sender.send("twitter-oauth-token", token);
});
