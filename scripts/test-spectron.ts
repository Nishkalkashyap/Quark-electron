import { Application } from 'spectron';

const filePath = './test/__testResults__/result.json';
var app = new Application({
    path: './build/win-unpacked/Quark.exe',
    args : [filePath]
});

app.start().then((val) => {
    console.log(val);
}).catch((console.error));