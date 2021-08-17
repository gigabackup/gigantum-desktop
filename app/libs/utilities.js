import open from 'open';
import os from 'os';
import path from 'path';
import log from 'electron-log';
import { execSync } from 'child_process';
import Storage from '../storage/Storage';

const storage = new Storage();

const isWindows = process.platform === 'win32';

let useWSLPath = false;
let repoName;
let hostDirectory = path.join(os.homedir(), 'gigantum');

if (isWindows) {
  try {
    const wslRepos = execSync('wsl -l').toString();
    wslRepos
      .split('\n')
      .slice(1)
      .map(data => data.replace(/[^a-zA-Z ]/g, ''))
      .forEach(data => {
        if (
          data.toLowerCase().indexOf('ubuntu') > -1 &&
          data.toLowerCase().indexOf('default') > -1
        ) {
          useWSLPath = true;
          [repoName] = data.split(' ');
        }
      });
  } catch (error) {
    console.log('WSL not set up');
  }
}

if (useWSLPath) {
  hostDirectory = `\\\\wsl$\\${repoName}${execSync(
    'wsl -e bash -c "echo $HOME"'
  )
    .toString()
    .trim()}/gigantum`.replaceAll('/', '\\');
}

log.warn(`useWSLPath is set as: ${useWSLPath}`);
log.warn(`repoName is set as: ${repoName}`);
log.warn(`hostDirectory is set as: ${hostDirectory}`);

export default {
  open: route => {
    const defaultBrowser = storage.get('defaultBrowser');
    const browserDictionary = {
      Chrome: 'google chrome',
      Firefox: 'firefox'
    };
    const options = defaultBrowser
      ? {
          app: browserDictionary[defaultBrowser]
        }
      : {};
    open(route, options);
  },
  openExplorer: () => {
    if (useWSLPath) {
      try {
        // ensure it exists before trying to open
        execSync('wsl -e bash -c "mkdir $HOME/gigantum"');
      } catch (error) {
        console.log(error);
      }
    }
    try {
      execSync(`explorer.exe "${hostDirectory}"`);
    } catch (error) {
      console.log(error);
    }
  }
};
