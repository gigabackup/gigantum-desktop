// vendor
import React from 'react';
// components
import { LoaderText } from '../../../../../components/loader/index';

const CheckCompatabilityStatus = () => (
    <LoaderText
      header="Compatibility check"
      message="Checking to see if your operating system is compatale with WSL2"
    />
  );


export default CheckCompatabilityStatus;
