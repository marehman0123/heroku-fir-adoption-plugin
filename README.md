@fir/heroku-adoption-tool
=================

Internal adoption plugin for Heroku Fir


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@fir/heroku-adoption-tool.svg)](https://npmjs.org/package/@fir/heroku-adoption-tool)
[![Downloads/week](https://img.shields.io/npm/dw/@fir/heroku-adoption-tool.svg)](https://npmjs.org/package/@fir/heroku-adoption-tool)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @fir/heroku-adoption-tool
$ heroku COMMAND
running command...
$ heroku (--version)
@fir/heroku-adoption-tool/0.0.0 darwin-x64 node-v20.18.0
$ heroku --help [COMMAND]
USAGE
  $ heroku COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku fir linter`](#heroku-fir-linter)
* [`heroku help [COMMAND]`](#heroku-help-command)
* [`heroku plugins`](#heroku-plugins)
* [`heroku plugins add PLUGIN`](#heroku-plugins-add-plugin)
* [`heroku plugins:inspect PLUGIN...`](#heroku-pluginsinspect-plugin)
* [`heroku plugins install PLUGIN`](#heroku-plugins-install-plugin)
* [`heroku plugins link PATH`](#heroku-plugins-link-path)
* [`heroku plugins remove [PLUGIN]`](#heroku-plugins-remove-plugin)
* [`heroku plugins reset`](#heroku-plugins-reset)
* [`heroku plugins uninstall [PLUGIN]`](#heroku-plugins-uninstall-plugin)
* [`heroku plugins unlink [PLUGIN]`](#heroku-plugins-unlink-plugin)
* [`heroku plugins update`](#heroku-plugins-update)

## `heroku fir linter`

Run the linter for the Fir project

```
USAGE
  $ heroku fir linter -s <value> [-a <value>]

FLAGS
  -a, --app=<value>    The name of the Heroku app (optional)
  -s, --space=<value>  (required) The name of the Heroku Private Space (required)

DESCRIPTION
  Run the linter for the Fir project
```

_See code: [src/commands/fir/linter.ts](https://github.com/marehman0123/heroku-fir-adoption-plugin/Muhhmad%20Abdul%20Rehman/blob/v0.0.0/src/commands/fir/linter.ts)_


<!-- commandsstop -->
