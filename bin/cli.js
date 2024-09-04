#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = comand => {
    try {
        execSync(`${comand}`, {stdio: 'inherit'})
    } catch (error) {
        console.log(e, 'Fallo comando')
        return false;
        
    }
    return true;
}

const repoName = process.argv[2];

const gitCheckoutCommand = `git clone --depth 1 https://github.com/7Erick21/task-interview-react-erick.git ${repoName}`;
const installDeps = `cd ${repoName} && npm install`;

const ck = runCommand(gitCheckoutCommand);

if(!ck) process.exit(-1);

const install = runCommand(installDeps);
if(!install) process.exit(-1)
