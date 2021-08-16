// vendor
import childProcess from 'child_process';

/**
 * @param {Function} callback
 * checks if linux kernal is installed
 */
const checkWSLUser = () =>
  new Promise((resolve, reject) => {

    const wsl =  childProcess.spawn('wsl', ['-u', 'gigantum']);

      // catch error and deal with in stdout
      wsl.on('error', (error) => {
        console.log(error)
      });

      wsl.stdout.on('data', (data) => {
        const formattedResponse = data.replace(/^\s+|\s+$/g, '');
        if (formattedResponse.indexOf('User not found') > -1) {
          return resolve();
        }
        return reject();
      });
  });



export default checkWSLUser;
