import chalk from 'chalk';

export function printConsoleStatus(message: string, status: 'success' | 'danger') {
    let emoji = (status == 'danger') ? '❗️' : '✅';
    console.log(chalk.greenBright(`|  ${emoji}   | ${message}`));
}