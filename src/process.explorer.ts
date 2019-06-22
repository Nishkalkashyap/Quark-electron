import { openProcessManager } from 'electron-process-manager';
import { ipcMain } from 'electron';
export function registerProcessExplorer() {
    ipcMain.on('show-process-explorer', () => {
        openProcessManager({ how: 'descending', path: 'cpu.percentCPUUsage' });
    });
}