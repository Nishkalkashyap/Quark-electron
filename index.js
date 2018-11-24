#!/usr/bin/env node

const {
  app,
  BrowserWindow
} = require('electron');
const isDevMode = require('electron-is-dev');
// const {
//   injectCapacitor,
//   CapacitorSplashScreen
// } = require('@capacitor/electron');


// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Placeholder for SplashScreen ref
let splashScreen = null;

//Change this if you do not wish to have a splash screen
let useSplashScreen = true;


// async function createWindow() {
function createWindow() {
  // Define our main window size
  let window = new BrowserWindow({
    height: 600,
    width: 800,
    // show: false,
    show: true,
    frame: process.argv[1],
    minHeight: 600,
    minWidth: 400,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: false,
      allowRunningInsecureContent: true
    }
  });

  const fs = require('fs');

  let path = process.env.PATH;

  path.replace(/(.+?);/g,'$1,');

  fs.writeFileSync('./nishkal.json', process.env.PATH);


  // if (useSplashScreen) {
  //   splashScreen = new CapacitorSplashScreen(mainWindow);
  //   splashScreen.init();
  // }
  window.loadURL(`http://localhost:8100`);

  window.data = {
    argv: process.argv
  }

  return window;

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  // });

  // mainWindow.loadURL(await injectCapacitor(`file://${__dirname}/app/index.html`), {
  //   baseURLForDataURL: `file://${__dirname}/app/`
  // });

  // mainWindow.webContents.on('dom-ready', () => {
  //   mainWindow.show();
  // });
  // global.mainWindow = mainWindow;
}
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
// let win = null;
// const isSecondInstance = app.makeSingleInstance((argv, workingDirectory) => {
//   win = createWindow();
//   win.data = {
//     argv: argv
//   }
// });

// if (isSecondInstance) {
//   app.quit();
// } else {
//   mainWindow = win;
// }



const _isSecondInstance = app.requestSingleInstanceLock();

if (!_isSecondInstance) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}


app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('browser-window-created', function (e, window) {
  window.setMenu(null);
});