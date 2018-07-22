const {
  app,
  BrowserWindow,
  Menu
} = require('electron');
const isDevMode = require('electron-is-dev');
const {
  injectCapacitor,
  CapacitorSplashScreen
} = require('@capacitor/electron');


const Server = require('./node/server');
const menu = require('./node/menu');
require('electron-reload', __dirname);


// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Placeholder for SplashScreen ref
let splashScreen = null;

//Change this if you do not wish to have a splash screen
let useSplashScreen = true;


async function createWindow() {
  // Define our main window size
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: false,
  });

  let server = new Server.SocketServer(4300, mainWindow);


  if (isDevMode) {
    // Set our above template to the Menu Object if we are in development mode, dont want users having the devtools.
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu.menuTemplateDev));
    // If we are developers we might as well open the devtools by default.
    mainWindow.webContents.openDevTools();
  }

  if (useSplashScreen) {
    splashScreen = new CapacitorSplashScreen(mainWindow);
    splashScreen.init();
  } else {
    mainWindow.loadURL(await injectCapacitor(`file://${__dirname}/app/index.html`), {
      baseURLForDataURL: `file://${__dirname}/app/`
    });
    mainWindow.webContents.on('dom-ready', () => {
      mainWindow.show();
    });
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
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
