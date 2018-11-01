const {
  app,
  BrowserWindow
} = require('electron');
const isDevMode = require('electron-is-dev');
// const {
//   injectCapacitor,
//   CapacitorSplashScreen
// } = require('@capacitor/electron');

const updater = require('./node/auto-updater');
// let pathToOpenInNewWindow = '';
// global.five = require('johnny-five');
// global.serialport = require('serialport');
// console.log(process.defaultApp);
// console.log(process.mainModule);
// console.log(process.pid);
// console.log(process.platform);
// console.log(process.ppid);app.

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
    frame: false,
    minHeight: 600,
    minWidth: 400,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: false,
      allowRunningInsecureContent: true
    }
  });


  // let server = new Server.SocketServer(4300, mainWindow);

  // updater.checkForUpdates();


  // if (isDevMode) {
  // Set our above template to the Menu Object if we are in development mode, dont want users having the devtools.
  // Menu.setApplicationMenu(Menu.buildFromTemplate(menu.menuTemplateDev));
  // If we are developers we might as well open the devtools by default.
  // mainWindow.webContents.openDevTools();
  // }

  // if (useSplashScreen) {
  //   splashScreen = new CapacitorSplashScreen(mainWindow);
  //   splashScreen.init();
  // }
  // fileServer.on('listening', () => {
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
let win = null;
const isSecondInstance = app.makeSingleInstance((argv, workingDirectory) => {
  win = createWindow();
  win.data = {
    argv: argv
  }
});

if (isSecondInstance) {
  app.quit()
} else {
  mainWindow = win;
}


app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Define any IPC or other custom functionality below here