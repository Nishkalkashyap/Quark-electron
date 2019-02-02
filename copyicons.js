(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "ncp", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ncp = require("ncp");
    var fs = require("fs");
    // import * as ncp from 'node_modules/@types/ncp';
    ncp.ncp('./node_modules/', './definitions/', {
        filter: function (file) {
            return (fs.statSync(file).isDirectory() || file.includes('.d.ts') || file.endsWith('package.json')) && !file.replace('node_modules', '').includes('node_modules');
        },
        dereference: true
    }, function (e) {
        console.log(e, 'hehe');
    });
    ncp.ncp('./../QuarkUMD/src/assets/', './www/assets/', function (e) {
        console.log(e);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weWljb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29weWljb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEseUJBQTJCO0lBQzNCLHVCQUF5QjtJQUN6QixrREFBa0Q7SUFFbEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRTtRQUN6QyxNQUFNLEVBQUUsVUFBQyxJQUFJO1lBQ1QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEssQ0FBQztRQUNELFdBQVcsRUFBRSxJQUFJO0tBQ3BCLEVBQUUsVUFBQyxDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLGVBQWUsRUFBRSxVQUFDLENBQUM7UUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQyJ9