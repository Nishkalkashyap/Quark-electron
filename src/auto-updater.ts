import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import * as fs from 'fs-extra';
import { autoUpdatesFilePath, AutoUpdateInterface } from '@quarkjs/api/umd/src/api/electron/electron.internal';

export function initializeLogger() {
    autoUpdater.logger = log;
    autoUpdater.logger['transports'].file.level = 'info';
    log.info('App starting...');
}

export async function setAutoUpdaterOptions() {
    log.info(`Auto updates file path: ${autoUpdatesFilePath}`);

    const exists = await fs.pathExists(autoUpdatesFilePath);
    if (exists) {
        const fileData: AutoUpdateInterface = await fs.readJson(autoUpdatesFilePath);
        autoUpdater.setFeedURL({
            provider: 'generic',
            url: `https://quark-release.quarkjs.io/${fileData.releaseChannel || 'stable'}`
        });
        console.log(`Update url set to: https://quark-release.quarkjs.io/${fileData.releaseChannel || 'stable'}`);

        autoUpdater.allowDowngrade = fileData.releaseChannel == 'stable';
        console.log(`Allow downgrade: ${autoUpdater.allowDowngrade}`);

        if (fileData.disableAutoUpdates) {
            console.log(`Auto Updates status: ${fileData.disableAutoUpdates} (fileData.disableAutoUpdates)`);
            return;
        }
    }
    const result = await autoUpdater.checkForUpdatesAndNotify();
    console.log(result, 'result');
}