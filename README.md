storm
=====

![Codeship Build Badge](https://codeship.com/projects/48dd4e20-8f23-0132-7756-0a0cf4fe8e66/status?branch=master)

## Development Environment ##

Pre-requisites: Install Virtualbox, Docker, Fig, and Dingy.

1. Run `fig build`
2. Run `sudo npm install` to get dev-dependencies
3. Start processes: `fig up` to start Server + Database, `npm run watch` for client build

## Important Commands ##

- Installing new modules: `fig run web npm install <module>`
- Testing: `fig run web npm test`
- Run Migrations: `fig run web npm run migrate`
- Client Prod Build: `npm run build`
- Client Dev Watcher: `npm run watch`

