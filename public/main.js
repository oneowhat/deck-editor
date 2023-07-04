const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const deckRepo = require('./db/deckRepository');
const projectRepository = require('./db/projectRepository');
const { async } = require('q');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.webContents.openDevTools();
  mainWindow.loadURL('http://localhost:3000');
};

ipcMain.on('quit-app', (args) => {
  app.quit();
});

ipcMain.handle('get-decks', async (args) => {
  return deckRepo.findAll();
});

ipcMain.handle('add-deck', async (event, deck) => {
  return deckRepo.add(deck);
});

ipcMain.handle('get-projects', async (args) => {
  return projectRepository.findAll();
});

ipcMain.handle('get-project-by-id', async (event, id) => {
  return projectRepository.findById(id);
});

ipcMain.handle('add-project', async (event, project) => {
  return projectRepository.add(project);
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});