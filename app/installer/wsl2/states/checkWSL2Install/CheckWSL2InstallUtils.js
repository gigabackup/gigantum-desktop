// vendor
import childProcess from 'child_process';


/**
* returns promise that checks wsl is installed by error code response
* @return {Promise}
*/
const checkWSLInstall = () => new Promise((resolve, reject) => {
    const wslCheck = childProcess.spawn('wsl', ['-l', '-v']);

    wslCheck.on('error', data => {
      console.log(data);
    });

    wslCheck.on('close', code => {
      if (code === 0) {
        return resolve();
      }
      return reject();
    });
  });



export default checkWSLInstall;
