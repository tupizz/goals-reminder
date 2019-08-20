const { app, BrowserWindow, Tray, Menu } = require('electron');
const AutoLaunch = require('auto-launch');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        title: 'Habit Tracker 1.0',
        icon: path.resolve(__dirname, 'icons', 'icon.png'),
        titleBarStyle: 'hidden',
    });

    const autoLaunch = new AutoLaunch({
        name: app.getName(),
        path: app.getPath('exe'),
    });

    autoLaunch.isEnabled().then(isEnabled => {
        if (!isEnabled) autoLaunch.enable();
    });

    const appIcon = new Tray(path.resolve(__dirname, 'icons', 'icon.png'));
    appIcon.setContextMenu(
        Menu.buildFromTemplate([
            {
                label: 'Mostrar Aplicativo',
                click() {
                    mainWindow.show();
                },
            },
            {
                label: 'Sair',
                click() {
                    app.isQuiting = true;
                    app.quit();
                },
            },
        ])
    );

    if (!isDev) {
        mainWindow.setMenuBarVisibility(false);
    }

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    if (isDev) {
        // Open the DevTools.
        // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
        mainWindow.webContents.openDevTools();
    }

    // eslint-disable-next-line no-return-assign
    mainWindow.on('closed', () => (mainWindow = null));

    mainWindow.on('close', event => {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
    });

    mainWindow.on('minimize', event => {
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on('show', () => appIcon.setHighlightMode('always'));
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
