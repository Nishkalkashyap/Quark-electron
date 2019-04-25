import chalk from 'chalk';

export function printConsoleStatus(message: string, status: 'success' | 'danger') {
    let emoji = (status == 'danger') ? '  ❗' : ' ✅ ';
    const color = (status == 'danger') ? chalk.redBright : chalk.greenBright;
    console.log(color(`| ${emoji}  | ${message}`));
}