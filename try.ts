// let functionsObjectForInternalUse = {};
let closureObjectForInternalUse = {};
let aliasForProcess = process;
let frameRateForInternalUse = 500;
let mtr_button_1534002850627 = JSON.parse('{"content":"mtr_button_1534002850627","color":"#000000"}');
functionsObjectForInternalUse['Mtr_Button_1534002850627'] = new Function('args', '');
closureObjectForInternalUse['mtr_button_1534002850627'] = mtr_button_1534002850627;
let button1 = JSON.parse('{"content":"button1","color":"#000000"}');
functionsObjectForInternalUse['Mtr_Button_1534002850792'] = new Function('args', 'process.send(button1);');
closureObjectForInternalUse['button1'] = button1;
(function() { // var board = new five.Board({
    //   port : "COM3",
    //   repl : false     
    // });
    // board.on("ready", function() {
    //   var led = new five.Led(13);
    //   led.blink(500);
    // });
    console.log(arguments);;
    aliasForProcess.send('process-starte
    //button1.content = "123";
    setInterval(() => {
        //aliasForProcess.send(closureObjectForInternalUse);
    }, 1000);
    functionsObjectForInternalUse[data.functionName](data.args);
    aliasForProcess.on('message', (data) => {
        try {
            process.send(data);
            functionsObjectForInternalUse[data.functionName](data.args);
        } catch (err) {
            aliasForProcess.send({
                errMsg: err
            });
        }
    });
})();