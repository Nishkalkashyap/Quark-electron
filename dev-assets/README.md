# Quark-electron
Electron build 

## Do not delete vscode-language-services.
needed by vue language


update package.json version
npm run copy
npm run bl && npm run bw
npm run release
Test the exe
npm run upload
npm run notes //to social.quarkjs.io

<!-- in documentation -->
npm run land
npm run test


#### Features
#### Bug fixes:
#### Other changes
#### Dependencies
#### Minor Changes:

add .quarkignore like vscode ignore



## Packaged
### Directly started: == shortcut
* process.argv.length = 1;
* process.argv[0] = 'exe' path;

### File opened start:
* process.argv.length = 2;
* process.argv[0] = 'exe' path && process.argv[1] = 'file-path';


## Not-Packaged
### Directly started:
* process.argv.length = 2;
* process.argv[0] = 'exe' path && process.argv[1] = 'working dir';

### File opened start:
* process.argv.length = 3;
* process.argv[0] = 'exe' path && process.argv[1] = 'working dir'; && process.argv[2] = 'file-path' 
