import childProcess from 'child_process';

const isWindows = process.platform === 'win32';

export default {
  getSpawn: (command, arr) => {
    if (
      isWindows &&
      process.env.PATH &&
      process.env.PATH.indexOf('Docker') === -1
    ) {
      return childProcess.spawn(command, arr, {
        env: {
          PATH: `C:\\ProgramData\\DockerDesktop\\version-bin;C:\\Program Files\\Docker\\Docker\\Resources\\bin;${process.env.PATH}`
        }
      });
    }
    childProcess.spawn(command, arr);
  }
};
