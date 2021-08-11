// vendor
import childProcess from 'os';

const checkWSLInstallStatus = () =>
  new Promise((resolve, reject) => {
    const wslCheck = childProcess.spawn('powershell', ['wsl', '-l']);
    wslCheck.on('close', code => {
      console.log(code)
      if (code === 0) {
        return reject();
      }
      return resolve();
    });
  });



export default checkWSLInstallStatus;
