import { IBrowserWindow, getHashKeyForProject, HASHED_KEYS, mainProcessDataFilePath, AppMainProcessData } from "@quarkjs/api/umd/src/api/electron/electron.internal";
import { get } from 'lodash';
import { BrowserWindow, app } from 'electron';
import * as fs from 'fs-extra';

let mainProcessData: AppMainProcessData;

export function getLandingPageWindow(): IBrowserWindow {
    const win = new BrowserWindow({
        backgroundColor: '#000000',
        resizable: !app.isPackaged,
        show: true,
        width: 400,
        height: 600,
        frame: true,
        autoHideMenuBar: false,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            allowRunningInsecureContent: true
        }
    });
    return <IBrowserWindow>win;
}

export function setMainProcessData() {
    if (fs.existsSync(mainProcessDataFilePath)) {
        try {
            const file = fs.readFileSync(mainProcessDataFilePath).toString();
            console.log(file, 'file');
            mainProcessData = JSON.parse(file);
        } catch (err) {
            console.error(err);
        }
        return;
    }
    mainProcessData = {} as any;
}

export function getDesignerPageWindow(projectPath: string): IBrowserWindow {
    const win = new BrowserWindow({
        backgroundColor: get(mainProcessData, `bgColors.${getHashKeyForProject(HASHED_KEYS.BG_COLOR, projectPath)}`) || '#222428',
        show: true,
        frame: false,
        minHeight: 600,
        minWidth: 400,
        width: 900,
        height: 700,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            allowRunningInsecureContent: true
        }
    });
    return <IBrowserWindow>win;
}