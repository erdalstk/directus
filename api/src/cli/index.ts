#!/usr/bin/env node

import program from 'commander';

const pkg = require('../../package.json');

import start from './commands/start';
import init from './commands/init';
import dbInstall from './commands/database/install';
import dbMigrate from './commands/database/migrate';

program.name('directus').usage('[command] [options]');
program.version(pkg.version, '-v, --version');

program.command('start').description('Start the Directus API').action(start);
program.command('init').description('Create a new Directus Project').action(init);

const dbCommand = program.command('database');

dbCommand.command('install').description('Install the database').action(dbInstall);
dbCommand.command('migrate:latest').description('Upgrade the database').action(() => dbMigrate('latest'));
dbCommand.command('migrate:up').description('Upgrade the database').action(() => dbMigrate('up'));
dbCommand.command('migrate:down').description('Downgrade the database').action(() => dbMigrate('down'));

program.parse(process.argv);
