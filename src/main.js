const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    minWidth: 500,
    maxWidth: 500,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const startUrl = process.env.DEV_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(startUrl);
};

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function() {
  if (mainWindow === null) createWindow()
});