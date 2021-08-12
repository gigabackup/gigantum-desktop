import sudo from 'sudo-prompt';

const launchUbuntu = (downloadedFile) => {
  const options = { name: 'Gigantum', shell: true };
  const addUbuntu = `Add-AppxPackage ${downloadedFile}`;
  // TODO: programatically look for Ubuntu20.04 directory
  const runUbuntu = `Start-Process 'C:\\Program Files\\WindowsApps\\CanonicalGroupLimited.Ubuntu20.04onWindows_2004.2020.424.0_x64__79rhkp1fndgsc\\ubuntu2004.exe'`;
  sudo.exec(
    `${addUbuntu}; ${runUbuntu}`,
    options,
    (error, response) => {
      console.log(error, response);
      if (error) {
        // TODO: Transition to state machine reject state
      } else {
        callback({
        // TODO: Transition to state machine resolve state
      }
    }
  );
}

export default {
    launchUbuntu,
}