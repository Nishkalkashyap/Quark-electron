const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    // mode: 'development',
    entry: path.resolve('./index.ts'),
    output: {
        path: path.resolve('./'),
        filename: 'index.js',
    },
    externals: [nodeExternals({
        whitelist: [/@quarkjs.+/, 'lodash']
    })],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: (file) => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            [
                                ("@babel/preset-env"), {
                                    "targets": {
                                        "chrome": "69"
                                    }
                                }
                            ],
                            [("@babel/preset-typescript"), {
                                isTSX: false,
                                allExtensions: true
                            }],
                        ],
                        "plugins": [
                            ("@babel/plugin-proposal-class-properties"),
                            ("@babel/plugin-proposal-object-rest-spread"),
                            ("@babel/plugin-syntax-dynamic-import")
                        ]
                    }
                }
            }
        ]
    },
    target: 'electron-main',
    node: {
        __dirname: false
    }
}