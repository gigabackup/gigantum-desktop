// vendor
import React from 'react';
// components
import { LoaderText } from '../../../../../components/loader/index';

const CheckInstallStatus = () => (
    <LoaderText
      header="Checking WSL2 Install"
      message="Checking to see if wsl2 has been installed."
    />
  );


export default CheckInstallStatus;
