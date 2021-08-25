// vendor
import Shell from 'node-powershell';

/**
 * @param {Function} callback
 * checks if linux kernal is installed
 */
const checkKernelInstall = () =>
  new Promise((resolve, reject) => {
    const ps = new Shell({
      executionPolicy: 'Bypass',
      noProfile: true
    });
    ps.addCommand(
      '(gp HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*).DisplayName -Contains "Windows Subsystem for Linux Update"'
    );
    ps.invoke()
      .then(response => {
        const formattedResponse = response.replace(/^\s+|\s+$/g, '');
      
        if (formattedResponse !== 'True') {
          ps.dispose();
          return reject(new Error('KERNAL_UNINSTALLED'));
        }
        return resolve();
      })
      .catch(() => {
        ps.dispose();
        return reject(new Error('KERNAL_UNINSTALLED'));
      });
  });



export default checkKernelInstall;
