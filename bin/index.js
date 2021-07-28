#!/usr/bin/env node

const program = require('commander');
const process1 = require('child_process');
const ora = require('ora');
const rm = require('rimraf').sync;
const execSync = require('child_process').execSync;
const path = require('path');

const spinner = ora();
const gitUrl = 'https://github.com/seatable/seatable-plugin-template.git';

program
  .version(require('../package').version, '-v, --version')
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

      const cwd = process.cwd();
      const context = path.resolve(cwd, projectName);

      execSync('git init', { stdio: 'ignore', cwd: context });
      execSync('git add .', { stdio: 'ignore', cwd: context });
      execSync('git commit -m "Initialize project using create-dtable-plugin"', {stdio: 'ignore', cwd: context});

      console.log(stdout);
      spinner.stop();
      console.log('loading template success');
    });
  });
program.parse(process.argv);