const { contextBridge, ipcRenderer } = require('electron');
const deckDb = require('./db/models/deck');

contextBridge.exposeInMainWorld('api', {
  quitApp: (args) => ipcRenderer.send('quit-app', args),
  getDecks: () => deckDb.getDecks()
});