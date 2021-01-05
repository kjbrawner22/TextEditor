const {app, BrowserWindow, Menu} = require('electron');

try
{
  require('electron-reloader')(module)
} catch (_) {}

function createWindow()
{
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: 
    {
      nodeIntegration: true
    }
  });

  win.setResizable(false);

  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu'
    }
  ]);

  //Menu.setApplicationMenu(menu);

  win.loadFile('src/website/index.html');
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})