// vendor
import React from 'react';
// components
import { LoaderText } from '../../../../../components/loader/index';

const CheckInstallStatus = () => (
    <LoaderText
      header="Install docker"
      message="Checking to see if docker has been installed."
    />
  );


export default CheckInstallStatus;
