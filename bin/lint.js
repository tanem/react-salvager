import nodeCLI from 'shelljs-nodecli';
config.fatal = true;

nodeCLI.exec('eslint', '.');
