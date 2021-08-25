// vendor
import { execSync } from 'child_process';

/**
 * @param {Function} callback
 * checks if linux kernal is installed
 */
const checkWSLDistro = () =>
  new Promise((resolve, reject) => {

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
          return resolve();
        }

        return reject();
  });
});



export default checkWSLDistro;
