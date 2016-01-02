import nodeCLI from 'shelljs-nodecli';
config.fatal = true;

const [ , , target] = process.argv;

if (target === 'build') {
  nodeCLI.exec('rimraf', 'dist lib');
}

if (target === 'cov') {
  nodeCLI.exec('rimraf', 'coverage');
}
