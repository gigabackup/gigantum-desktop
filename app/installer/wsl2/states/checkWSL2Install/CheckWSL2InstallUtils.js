// vendor
import childProcess from 'os';

const checkWSLInstall = () => {
  console.log('checkWSLINstall');
  return new Promise((resolve, reject) => {
    const wslCheck = childProcess.spawn('addCommand', ['wsl', '-l']);
    console.log('wslcheck', wslCheck);
    wslCheck.on('close', code => {
      console.log('code', code)
      if (code === 0) {
        return reject();
      }
      return resolve();
    }).catch((error)=> {
      console.log(error)
      reject(error);
    });
  });
}



export default checkWSLInstall;
