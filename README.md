# indentreport README

Indent Reporter Extension for VSCode useful for Mac, Jaws and ZDSR blind users.

## Features

- Reports indentation level using sounds.
- Right now you can't enable / disable it, I'll add it if requested.
- Change volume with keyboard short cut

## Extension Settings

none yet

## Shortcuts
You can change the volume by setting up keyboard shortcuts for
`indent-reporter.volume-down` and `indent-reporter.volume-up`.
This means you can temporarily silence the sounds if you like.
An example is below, they only trigger when the editor has focus.

```json
{
    "command": "indent-reporter.volume-up",
    "key": "ctrl+shift+alt+up",
    "when": "editorTextFocus"
},
{
    "command": "indent-reporter.volume-down",
    "key": "ctrl+shift+alt+down",
    "when": "editorTextFocus"
}
```
## Known Issues

Can't yet toggle on / off

