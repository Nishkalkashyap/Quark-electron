(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "ncp", "fs-extra", "recursive-readdir"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ncp = require("ncp");
    var fs = require("fs-extra");
    var recc = require("recursive-readdir");
    copyDefinitions();
    copyAssets();
    function copyDefinitions() {
        var Package = fs.readJsonSync('./package.json');
        var deps = Package.dependencies;
        var dev = Package.devDependencies;
        var all = Object.keys(Object.assign({}, deps, dev));
        var includeFiles = ['@squirtle/api', '@types/firmata', '@types/fs-extra', '@types/johnny-five', '@types/node', '@types/serialport', 'electron'];
        all.map(function (val) {
            if (!includeFiles.includes(val))
                return;
            recc("./node_modules/" + val, [
                function (file, stat) {
                    return !stat.isDirectory() && !file.endsWith('.d.ts');
                }
            ], function (e, _files) {
                if (e) {
                    console.log(e);
                }
                if (_files.length == 0)
                    return;
                console.log(_files.length, val);
                copyFiles();
            });
            function copyFiles() {
                var mkdirp = require('mkdirp');
                mkdirp('./definitions/' + val, function (e) {
                    if (e) {
                        console.log(e);
                    }
                });
                ncp.ncp("./node_modules/" + val, './definitions/' + val, {
                    filter: function (file) {
                        return (((fs.statSync(file).isDirectory() || file.includes('.d.ts') || file.endsWith('package.json'))
                            && (!file.replace('node_modules', '').includes('node_modules')))
                            // && (file.search(/api[\\/]umd/) == -1)
                            && (file.search('.git') == -1));
                    },
                    dereference: true
                }, function (e) {
                    if (e) {
                        console.log(e, 'failed');
                    }
                });
            }
        });
    }
    function copyAssets() {
        ncp.ncp('./../QuarkUMD/src/assets/', './www/assets/', function (e) {
            console.log(e);
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weWljb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29weWljb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEseUJBQTJCO0lBQzNCLDZCQUErQjtJQUMvQix3Q0FBMEM7SUFFMUMsZUFBZSxFQUFFLENBQUM7SUFDbEIsVUFBVSxFQUFFLENBQUM7SUFFYixTQUFTLGVBQWU7UUFFcEIsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDbEMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUNwQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXRELElBQU0sWUFBWSxHQUFHLENBQUMsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUVqSixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztZQUVSLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDM0IsT0FBTztZQUVYLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLEVBQUU7Z0JBQzFCLFVBQUMsSUFBSSxFQUFFLElBQUk7b0JBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFELENBQUM7YUFDSixFQUFFLFVBQUMsQ0FBQyxFQUFFLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLEVBQUU7b0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEI7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUM7b0JBQ2xCLE9BQU87Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxTQUFTLEVBQUUsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztZQUVILFNBQVMsU0FBUztnQkFDZCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEVBQUUsVUFBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsRUFBRTt3QkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNsQjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLEdBQUcsRUFBRSxnQkFBZ0IsR0FBRyxHQUFHLEVBQUU7b0JBQ3JELE1BQU0sRUFBRSxVQUFDLElBQUk7d0JBQ1QsT0FBTyxDQUNILENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzsrQkFDdEYsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzRCQUNwRSx3Q0FBd0M7K0JBQ3JDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNqQyxDQUFDO29CQUNOLENBQUM7b0JBQ0QsV0FBVyxFQUFFLElBQUk7aUJBQ3BCLEVBQUUsVUFBQyxDQUFDO29CQUNELElBQUksQ0FBQyxFQUFFO3dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUM1QjtnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxTQUFTLFVBQVU7UUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLGVBQWUsRUFBRSxVQUFDLENBQUM7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMifQ==