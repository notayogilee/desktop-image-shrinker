const { app, BrowserWindow, Menu } = require('electron');

process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;
const isLinux = process.platform === 'linux' ? true : false;

let mainWindow;
let aboutWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev
  });

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  mainWindow.loadFile('./app/index.html');
};

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: ' About ImageShrink',
    width: 300,
    height: 300,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false
  });

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  aboutWindow.loadFile('./app/about.html');
};

app.on('ready', () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', () => mainWindow = null);
});

const menu = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {
        label: 'About',
        click: createAboutWindow,
      }
    ]
  }] : []),
  {
    role: 'fileMenu'
  },
  ...(!isMac) ? [
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: createAboutWindow,
        }
      ]
    }
  ] : [],
  ...(isDev ? [
    {
      label: 'Developer',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'separator' },
        { role: 'toggleDevTools' }
      ]
    }
  ] : [])
];

app.on('window-all-closed', function () {
  if (!isLinux) app.quit()
  if (!isMac) app.quit()
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
});


