# WSL SETUP

## Initial setup

The following command needs to be run after first installing WSL in order for it to be ready for use: `powershell dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart; wsl --set-default-version 2`. This is present in the current implementation. 

## Downloading, Installing and Running Ubuntu 20.04 Repository

In order to download the repository we would have to download Ubuntu 20.04 from the microsoft app store. To circumvent this, we can download the Ubuntu.appx file (required format) directly and user a power shell command to install it. We then need to run the installed application

1. Download the .appx file from `https://aka.ms/wslubuntu2004`
2. Run the powershell command `Add-AppxPackage ${filePath}` with `filePath` being the location of the downloaded .appx file
3. Run the Ubuntu file. using `Start-Process ${installPath}`

The file can be found at the time of this readme at: `C:\\Program Files\\WindowsApps\\CanonicalGroupLimited.Ubuntu20.04onWindows_2004.2020.424.0_x64__79rhkp1fndgsc\\ubuntu2004.exe`. However this will likely change and should instead be determined by searching for the directory that exists with `Ubuntu.20.04` in the parent directory: `C:\\Program Files\\WindowsApps\\`

## Starting container in Ubuntu repository

We can run commands for the Ubuntu WSL repo by doing `wsl -e bash -c '${COMMAND}'`. Therefore we can start Gigantum in the scope of the Ubuntu Repository like so:  `wsl -e bash -c 'docker run --rm -v labmanager_share_vol:/mnt/share
    -v ${HOME}/gigantum:/mnt/gigantum -v /var/run/docker.sock:/var/run/docker.sock
    -e HOST_WORK_DIR=${HOME}/gigantum -e LOCAL_USER_ID=1000 -p 127.0.0.1:10000:10000
    -d gigantum/labmanager:325f6c42'` HOME is an existing environment variable within the context of WSL which directs to the user directory

We also need to ensure the `gigantum` directory exists by running `wsl -e bash -c 'mkdir $HOME/gigantum'` at some point in our application, preferably before starting the container to ensure it still exists