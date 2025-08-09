const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onFocusInput: (callback) => ipcRenderer.on('focus-input', callback),
  openLoginWindow: () => ipcRenderer.send('open-login-window'),
  closeLoginWindow: () => ipcRenderer.send('close-login-window'),
  openAnswerWindow: () => ipcRenderer.send('open-answer-window'),
  closeAnswerWindow: () => ipcRenderer.send('close-answer-window'),
  hideMainWindow: () => ipcRenderer.send('hide-main-window'),
});
