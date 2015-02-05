storm
=====

https://codeship.com/projects/48dd4e20-8f23-0132-7756-0a0cf4fe8e66/status?branch=master

## Development Environment ##

Use Dinghy + Fig with Virtualbox, and then run `fig up`

## Important Commands ##

- Installing new modules: `fig run web npm install <module>`
- Testing: `fig run web npm test`
- Run Migrations: `fig run web npm run migrate`
- Client Prod Build: `fig run web npm run build`
- Client Dev Watcher: `fig run web npm run watch`

