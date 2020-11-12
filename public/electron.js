const { app, BrowserWindow, session } = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")
const {ipcMain} = require('electron')
const notifier = require('node-notifier')

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            nativeWindowOpen: true
        }
    })

    win.loadURL(isDev ?
        'http://localhost:3000/' :
        `http://ec2-13-127-158-77.ap-south-1.compute.amazonaws.com:5000/`);

    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow();
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = 'SuperDuperAgent';
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('notify', (event, arg) => {
    console.log(event)
    console.log(JSON.stringify(arg))
    notifier.notify({
        title: arg.title,
        message: arg.message
    })
})

// Fix insecure error when log in google account
app.userAgentFallback = app.userAgentFallback.replace('Electron/' + process.versions.electron, 'Electron');
app.userAgentFallback = app.userAgentFallback.replace('Chrome/' + process.versions.chrome, 'Chrome');