const {
  app,
  Tray,
  nativeImage,
  ipcMain,
  Menu,
  MenuItem,
  BrowserWindow,
  globalShortcut,
  Notification,
} = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1299,
    height: 900,
    frame: false,
    titleBarStyle: 'hidden',
    transparent: true,
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I');
      event.preventDefault();
    }
  });

  const INCREMENT = 0.03;
  const INTERVAL_DELAY = 100; // ms

  let c = 0;
  progressInterval = setInterval(() => {
    // update progress bar to next value
    // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
    win.setProgressBar(c);

    // increment or reset progress bar
    if (c < 2) {
      c += INCREMENT;
    } else {
      c = -INCREMENT * 5; // reset to a bit less than 0 to show reset state
    }
  }, INTERVAL_DELAY);
}

const NOTIFICATION_TITLE = 'Basic Notification';
const NOTIFICATION_BODY = 'Notification from the Main process';

function showNotification() {
  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
}

// const iconName = path.join(__dirname, 'index.png');
// const icon = fs.createWriteStream(iconName);

// // Create a new file to copy - you can also copy existing files.
// fs.writeFileSync(
//   path.join(__dirname, 'drag-and-drop-1.md'),
//   '# First file to test drag and drop'
// );
// fs.writeFileSync(
//   path.join(__dirname, 'drag-and-drop-2.md'),
//   '# Second file to test drag and drop'
// );

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click() {
      console.log('New Window');
    },
  },
  {
    label: 'New Window with Settings',
    submenu: [
      {
        label: 'Basic',
      },
      {
        label: 'Pro',
      },
    ],
  },
  { label: 'New Command' },
]);

const menu = new Menu();

menu.append(
  new MenuItem({
    label: 'Electron',
    submenu: [
      {
        role: 'help',
        accelerator:
          process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
        click: () => {
          console.log('Electron Rocks!!!!!');
        },
      },
    ],
  })
);

Menu.setApplicationMenu(menu);

let tray;
const contextMenu = Menu.buildFromTemplate([
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio', checked: true },
  { label: 'Item4', type: 'radio' },
]);

app.setAppUserModelId(process.execPath);

app
  .whenReady()
  .then(() => {
    const icon = nativeImage.createFromPath(
      path.join(__dirname, './index.png')
    );
    tray = new Tray(icon);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('This is my application');
    tray.setTitle('This is my title');
    // contextMenu, Tooltip and Title code will go here!

    globalShortcut.register('Alt+CommandOrControl+I', () => {
      console.log('Electron loves global shortcuts!');
    });
  })
  .then(createWindow)
  .then(showNotification);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('before-quit', () => {
  clearInterval(progressInterval);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
