import chalk from 'chalk';
import { execSync } from 'child_process';

export function printConsoleStatus(message: string, status: 'danger' | 'success' | 'warning' | 'info', indent: number = 0): void {
    let emoji = (status == 'danger') ? '  ❗' : (status == 'success') ? ' ✅ ' : (status == 'warning') ? ' ⚠️ ' : ' ️️💁 ';
    const color = (status == 'danger') ? chalk.redBright : (status == 'success') ? chalk.greenBright : (status == 'warning') ? chalk.yellowBright : chalk.whiteBright;
    console.log(color(Array(indent).fill('\s').join('') + `| ${emoji}  | ${message}`));
}

function getCurrentBranch(): branches {
    const gitBranch = execSync('git branch').toString();
    return gitBranch.includes('master') ? 'master' : gitBranch.includes('release') ? 'release' : 'insiders';
}

export type buckets = 'quarkjs-release-insiders' | 'quarkjs-builds' | 'quarkjs-auto-update';
export type branches = 'master' | 'release' | 'insiders';

export const metaData: {
    [branch: string]: {
        type: 'nightly' | 'nightly-all' | 'insiders' | 'stable';
        storageUrl: 'quark-build-nightly.quarkjs.io' | 'quark-build-nightly-all.quarkjs.io' | 'quark-build-insiders.quarkjs.io' | 'quark-build-stable.quarkjs.io';
    }
} = {
    'master': {
        type: 'nightly',
        storageUrl: 'quark-build-nightly.quarkjs.io'
    },
    'master-all': {
        type: 'nightly-all',
        storageUrl: 'quark-build-nightly-all.quarkjs.io'
    },
    'insiders': {
        type: 'insiders',
        storageUrl: 'quark-build-insiders.quarkjs.io'
    },
    'stable': {
        type: 'stable',
        storageUrl: 'quark-build-stable.quarkjs.io'
    }
};

export const currentBranch = process.env.APPVEYOR_REPO_BRANCH || process.env.TRAVIS_BRANCH || getCurrentBranch();

// printConsoleStatus('Added restore view state snackbar', 'danger');
// printConsoleStatus('Added restore view state snackbar', 'info');
// printConsoleStatus('Added restore view state snackbar', 'success');
// printConsoleStatus('Added restore view state snackbar', 'warning');