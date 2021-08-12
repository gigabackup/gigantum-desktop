// vendor
import os from 'os';

// consts
const isWindows = process.platform === 'win32';


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
