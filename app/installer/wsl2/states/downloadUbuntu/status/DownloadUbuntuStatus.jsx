import React from 'react';
import LinuxSrc from 'Images/logos/linux.png';

const DownloadUbuntuStatus = () => {
    <div className="Layout__Status">
    <div className="Layout__Status--body">
      <img alt="wsl2" src={LinuxSrc} width="150" height="150" />
      {/* TODO: Update onclick to transition state */}
      <button
        type="button"
        className="Btn__Status Btn--primary"
        onClick={() => {}}
      >
        Download & Install
      </button>
      <div className="InstallWSL2Status__subtext">
        This requires admin privileges. Gigantum will ask for elevated
        privileges during the installation process.{' '}
        <span
          role="presentation"
          onClick={() =>
            utils.open(
              'https://docs.docker.com/install/linux/docker-ce/debian/#install-using-the-convenience-script'
            )
          }
        >
          Learn More.
        </span>
      </div>
    </div>
  </div>
}

export default DownloadUbuntuStatus;