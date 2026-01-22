const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    title: "plant timer",
    width: 400,
    height: 600,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: true,
    background: "#00000000",
    webPreferences: {
      contextIsolation: true
    }
  });

  win.loadFile('index.html')

}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})