#### Features:
* Added textmate for better syntax highlighting.
* Added monokai and one dark theme.

#### Bug fixes:
* Fixed settings scope bug.Workspace settings now take precedence over global settings.
* Fixed persistant store onDidChange() method. Now using fs.watcher to detect file changes.
* Fixed window crash while adding extra libs to an opened editor.
* Fixed window state restore handle.