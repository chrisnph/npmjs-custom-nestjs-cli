#!/usr/bin/env node

const commander = require("commander");
const { addCommand } = require("../commands");
// const shell = require("shelljs");

const bootstrap = () => {
    const program = commander;
    program
        .version(require('../package.json').version, '-v, --version', 'Output the current version.')
        .usage('<command> [options]')
                    .helpOption('-h, --help', 'Output usage information.');

    const [, , ...params] = process.argv;
    addCommand(params[0]);
    // shell.pwd()
    
    // console.log(params);

    commander.parse(params[0]);

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};
bootstrap();
