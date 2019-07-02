#### Bug fixes:
* Fixed: Context menu not updating on language change.
* Fixed: Keybindings not getting removed when associated command is disposed.
* Fixed: Keybindings triggers random actions inside monaco-editor issue.
* Fixed: ASAR packager issue. (cannot pack single file)

#### Other changes:
* New files created are automatically opened in the editor.
* Editor is now automatically focused when file is opened.
* Added select-next and select-previous tabs bindings.

#### Breaking:
* Removed: `createVueWebComponent` method from quark.util object.