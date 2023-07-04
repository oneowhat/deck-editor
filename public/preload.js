const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  quitApp: (args) => 
    ipcRenderer.send('quit-app', args),
  getProjects: async (args) => {
    return await ipcRenderer.invoke('get-projects');
  },
  getProjectById: async (id) => {
    return await ipcRenderer.invoke('get-project-by-id', id);
  },
  addProject: async (project) => {
    return await ipcRenderer.invoke('add-project', project);
  },
  getDecks: async (args) => {
    return await ipcRenderer.invoke('get-decks');
  },
  addDeck: async (deck) => {
    return await ipcRenderer.invoke('add-deck', deck);
  },
});