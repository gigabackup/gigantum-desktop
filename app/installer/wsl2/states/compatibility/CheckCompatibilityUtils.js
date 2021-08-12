// vendor
import os from 'os';

// consts
const isWindows = process.platform === 'win32';

/**
* returns promise that if the os is compatible with wsl2
* @return {Promise}
*/
const checkCompatibility = () => (
   new Promise((resolve, reject) => {
    if (isWindows) {
      const build = os.release().split('.')[2];
      const wsl2Supported = Number(build) >= 18362;
      if (wsl2Supported) {
        return resolve();
      }
      return reject();
    }
    return reject();
  }))


export default checkCompatibility;
