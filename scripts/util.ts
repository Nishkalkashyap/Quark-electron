import chalk from 'chalk';

export function printConsoleStatus(message: string, status: 'success' | 'danger' | 'warning') {
    let emoji = (status == 'danger') ? '  ❗' : (status == 'success') ? ' ✅ ' : ' ⚠️ ';
    const color = (status == 'danger') ? chalk.redBright : (status == 'success') ? chalk.greenBright : chalk.yellowBright;
    console.log(color(`| ${emoji}  | ${message}`));
}