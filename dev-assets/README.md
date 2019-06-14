<!-- # Reload not working.
# Terminal has some problem
# Fix problems component overflow issue
# when you rename a typescript file, make sure to change path in definitions.   
add typescript alias for @project/ -->

## Do not delete vscode-language-services.
needed by vue language

<!-- If local release -->
<!-- In this dir -->
    update package.json version
    npm run tar
    npm run bl && npm run bw
    npm run test-build
    npm run release
    npm run upload
    npm run notes //to social.quarkjs.io
<!-- in documentation -->
    npm run land
    npm run test


<!-- If cloud release -->
<!-- In this dir -->
    update package.json version
    npm run tar
    git commit and push
    npm run release-master-all
    npm run release-ci
<!-- in documentation -->
    npm run prepare-release
    npm run test




#### Features
#### Bug fixes:
#### Other changes
#### Dependencies
#### Minor Changes:
#### Breaking:

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
