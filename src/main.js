const { app, BrowserWindow, globalShortcut, ipcMain, screen } = require('electron');
const path = require('path');

let mainWindow;   // 搜索框窗口
let loginWindow;  // 登录窗口
let answerWindow; // AI回复窗口

const INPUT_WIDTH = 400;
const INPUT_HEIGHT = 50;

const LOGIN_WIDTH = 420;
const LOGIN_HEIGHT = 600;

const ANSWER_WIDTH = 600;
const ANSWER_HEIGHT = 600;

function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: INPUT_WIDTH,
    height: INPUT_HEIGHT,
    x: Math.floor((width - INPUT_WIDTH) / 2),
    y: Math.floor((height - INPUT_HEIGHT) / 3),
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
  mainWindow.hide();
  mainWindow.setMenu(null);

  // 调试时打开 DevTools
  mainWindow.webContents.openDevTools({"mode": "detach"});

  mainWindow.on('blur', () => {
    // 点击别处自动隐藏所有窗口
    mainWindow.hide();
    loginWindow?.hide();
    answerWindow?.hide();
  });
}

function createLoginWindow() {
  if (loginWindow) return;

  loginWindow = new BrowserWindow({
    width: LOGIN_WIDTH,
    height: LOGIN_HEIGHT,
    show: false,
    parent: mainWindow,
    modal: false,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'login-preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      partition: 'persist:login', // 隔离存储
    },
  });

  loginWindow.loadURL('https://chat.openai.com/auth/login');

  loginWindow.on('closed', () => {
    loginWindow = null;
  });
}

function createAnswerWindow() {
  if (answerWindow) return;

  answerWindow = new BrowserWindow({
    width: ANSWER_WIDTH,
    height: ANSWER_HEIGHT,
    show: false,
    parent: mainWindow,
    modal: false,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'answer-preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      partition: 'persist:answer', // 隔离存储
    },
  });

  answerWindow.loadURL('https://chat.openai.com/chat');

  answerWindow.on('closed', () => {
    answerWindow = null;
  });
}

app.whenReady().then(() => {
  createMainWindow();

  globalShortcut.register('Control+Space', () => {
    if (!mainWindow) return;
    if (mainWindow.isVisible()) {
      mainWindow.hide();
      loginWindow?.hide();
      answerWindow?.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
      mainWindow.webContents.send('focus-input');
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('open-login-window', () => {
  if (!loginWindow) createLoginWindow();
  loginWindow.show();
  loginWindow.focus();
});

ipcMain.on('close-login-window', () => {
  if (loginWindow) loginWindow.hide();
});

ipcMain.on('open-answer-window', () => {
  if (!answerWindow) createAnswerWindow();
  answerWindow.show();
  answerWindow.focus();
});

ipcMain.on('close-answer-window', () => {
  if (answerWindow) answerWindow.hide();
});

ipcMain.on('hide-main-window', () => {
  if (mainWindow) mainWindow.hide();
});
