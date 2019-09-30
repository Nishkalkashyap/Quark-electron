import { IBrowserWindow, getHashKeyForProject, HASHED_KEYS, mainProcessDataFilePath, AppMainProcessData } from "@quarkjs/api/umd/src/api/electron/electron.internal";
import { get } from 'lodash';
import { BrowserWindow, app } from 'electron';
import * as fs from 'fs-extra';

export const devModeWindows: IBrowserWindow[] = [];
export const runModeWindows: IBrowserWindow[] = [];

export const buildFileMatchPattern = /\.(build.qrk|qrk.asar)$/;
export const LANDING_PAGE_APP_PATH = app.getPath('userData');
export const LANDING_PAGE_WINDOW_TYPE = devModeWindows;

export let mainProcessData: AppMainProcessData;
export function setMainProcessData() {
    if (fs.existsSync(mainProcessDataFilePath)) {
        try {
            const file = fs.readFileSync(mainProcessDataFilePath).toString();
            // console.log(file, 'file');
            mainProcessData = JSON.parse(file);
        } catch (err) {
            console.error(err);
        }
        return;
    }
    mainProcessData = {} as any;
}

export function getLandingPageWindow(): IBrowserWindow {
    const win = new BrowserWindow({
        backgroundColor: '#000000',
        // resizable: !app.isPackaged,
        // frame: !app.isPackaged,
        // autoHideMenuBar: !app.isPackaged,
        //do not use this flag. produces in-consistencies in build
        resizable: false,
        frame: true,
        show: true,
        width: 400,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            // Required in electron@6
            webviewTag: true,
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            allowRunningInsecureContent: true
        }
    });
    return <IBrowserWindow>win;
}

export function getDesignerPageWindow(projectPath: string): IBrowserWindow {
    const win = new BrowserWindow({
        backgroundColor: get(mainProcessData, `${getHashKeyForProject(HASHED_KEYS.BG_COLOR, projectPath)}`) || '#222428',
        show: true,
        frame: false,
        minHeight: 600,
        minWidth: 400,
        width: 900,
        height: 700,
        webPreferences: {
            // Required in electron@6
            webviewTag: true,
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            allowRunningInsecureContent: true
        }
    });
    return <IBrowserWindow>win;
}

export function handleEmptyPromise(func: Promise<any>) {
    return new Promise((resolve) => {
        func.then((val) => {
            console.log(val);
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            resolve(null);
        });
    });
}

export interface WindowMeta {
    type: ('landing' | 'designer');
    filepath: string;
    windowType: IBrowserWindow[];
}