import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { app, BrowserWindow } from 'electron'
import * as url from 'url';
import * as path from 'path';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

    let win: BrowserWindow | null = null;

    function createWindow () {
      win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      })

      win.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/electron-app/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
      // Open the DevTools.
      win.webContents.openDevTools()

      win.on('closed', function () {
        win = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (win === null) createWindow()
    })
