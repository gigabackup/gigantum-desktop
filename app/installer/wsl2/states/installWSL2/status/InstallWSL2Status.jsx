// vendor
import React from 'react';
// components
import { LoaderText } from '../../../../../components/loader/index';

const InstallWSL2Status = () => (
    <LoaderText
      header="Installing wsl2"
      message="We are installing wsl2, you will need to restart when completed."
    />
  );


export default InstallWSL2Status;
