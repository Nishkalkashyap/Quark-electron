let functionsObjectForInternalUse = {};
let closureObjectForInternalUse = {};
let aliasForProcess = process;
let frameRateForInternalUse = 500;
let button1 = JSON.parse('{"content":"button1","color":"#000000"}');
functionsObjectForInternalUse['Mtr_Button_1534011681682'] = function(args) {
    button1.content = Math.random();
}
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
    aliasForProcess.send('process-started');
    setInterval(() => {
        aliasForProcess.send(closureObjectForInternalUse);
    }, 1000);

    aliasForProcess.on('message', (data) => {
        try {
            functionsObjectForInternalUse[data.functionName](data.args);
            //process.send(data);
        } catch (err) {
            aliasForProcess.send({
                errMsg: err
            });
        }
    });
})();