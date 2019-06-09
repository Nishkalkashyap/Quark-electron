import chalk from 'chalk';

export function printConsoleStatus(message: string, status: 'danger' | 'success' | 'warning' | 'info', indent: number = 0): void {
    let emoji = (status == 'danger') ? '  ❗' : (status == 'success') ? ' ✅ ' : (status == 'warning') ? ' ⚠️ ' : ' ️️💁 ';
    const color = (status == 'danger') ? chalk.redBright : (status == 'success') ? chalk.greenBright : (status == 'warning') ? chalk.yellowBright : chalk.whiteBright;
    console.log(color(Array(indent).fill('\s').join('') + `| ${emoji}  | ${message}`));
}

// printConsoleStatus('Added restore view state snackbar', 'danger');
// printConsoleStatus('Added restore view state snackbar', 'info');
// printConsoleStatus('Added restore view state snackbar', 'success');
// printConsoleStatus('Added restore view state snackbar', 'warning');