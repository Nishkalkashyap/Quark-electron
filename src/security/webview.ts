import { app } from "electron";

export function enableWebviewSecurity() {
    app.on('web-contents-created', (event, contents) => {
        contents.on('will-attach-webview', (event, webPreferences, params) => {
            // Strip away preload scripts if unused or verify their location is legitimate
            delete webPreferences.preload
            delete webPreferences.preloadURL

            // Disable Node.js integration
            webPreferences.nodeIntegration = false
        });
    });
}