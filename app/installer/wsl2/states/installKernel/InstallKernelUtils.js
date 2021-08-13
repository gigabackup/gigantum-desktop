// vendor
import sudo from 'sudo-prompt';
import os from 'os';
import fs from 'fs';

/**
* @param {Function} callback
* installs linux kernal
*/
const installKernal = () =>
  new Promise((resolve, reject) => {
    const options = { name: 'Gigantum', shell: true };
    const execScript =
     'powershell Invoke-WebRequest -Uri https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi -OutFile wsl_update_x64.msi -UseBasicParsing; Start-Process .\\wsl_update_x64.msi -ArgumentList "/quiet" -Wait';
   sudo.exec(execScript, options, error => {
     if (error) {
       return reject();
     }
     const settingsPath = `${os.homedir()}\\AppData\\Roaming\\Docker\\settings.json`;
     if (fs.existsSync(settingsPath)) {
       const settingsRawData = fs.readFileSync(settingsPath);
       const settings = JSON.parse(settingsRawData);
       settings.wslEngineEnabled = true;
       const newSettings = JSON.stringify(settings);

       fs.writeFileSync(settingsPath, newSettings);
       resolve();
      } else {
       resolve();
      }
    });
 });



export default installKernal;
