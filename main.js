const { app, BrowserWindow } = require('electron');
const path = require('path');

// 1. Start the Backend Server automatically
// This runs your Node.js/Express server in the background
require('./backend/server.js'); 

function createWindow() {
    // 2. Create the App Window
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        title: "Wash Connect System",
        icon: "frontend/icon.png", // Optional icon
        autoHideMenuBar: true, // Hides the "File/Edit" menu for a cleaner look
        webPreferences: {
            nodeIntegration: true
        }
    });

    // 3. Load the App
    // We wait 1.5 seconds to ensure the backend has started
    setTimeout(() => {
        win.loadURL('http://localhost:3000');
    }, 1500);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});