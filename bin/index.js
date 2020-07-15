#!/usr/bin/env node

const program = require('commander');
const process1 = require('child_process');
const ora = require('ora');
const rm = require('rimraf').sync

const spinner = ora();
const gitUrl = 'https://github.com/seatable/seatable-plugin-template.git';

program.version('0.0.1', '-v, --version')
    .command('init <name>')
    .action((name) => {
        console.log('start loading template');
        const projectName = name;
        spinner.start('clone template ...');
        process1.exec('git clone ' + gitUrl + ' ' + './' + projectName, function(error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
            return;
          }
          
          rm('./' + projectName + '/.git');
          console.log(stdout);
          spinner.stop();
          console.log('loading template success');
        });
    });
program.parse(process.argv);