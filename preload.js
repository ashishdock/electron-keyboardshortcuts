const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  startDrag: (filename) => {
    ipcRenderer.send('ondragstart', path.join(process.cwd(), filename));
  },
});
