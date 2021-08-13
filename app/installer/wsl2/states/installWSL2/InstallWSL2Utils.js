// vendor
import sudo from 'sudo-prompt';


/**
 * @param {Function} callback
 * Enable Windows Subsystem for Linux
 */
const installWSL2 = callback => {
  const options = { name: 'Gigantum', shell: true };
  const execScript =
    'cmd dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart; dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart; Restart-Computer';
  sudo.exec(execScript, options, (error, stdout, stderr) => {
    console.log(error, stdout, stderr)
    if (error) {
      callback({
        success: false,
        data: {}
      });
    } else {
      callback({
        success: true,
        data: {}
      });
    }
  });
};

export default installWSL2;
