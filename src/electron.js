const { app, BrowserWindow } = require("electron");
const path = require("path");
const endpoint = require("url");

let mainWindow;

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
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(url);
}

app.on("ready", createMainWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) createMainWindow();
});
