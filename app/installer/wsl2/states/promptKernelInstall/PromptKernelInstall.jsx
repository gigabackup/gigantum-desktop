// vendor
import React from 'react';
// componenets
import PromptKernelInstallMain from './main/PromptKernelInstallMain';
import PromptKernelInstallStatus from './status/PromptKernelInstallStatus';

type Props = {
  send: () => void
};

const PromptKernelInstall = ({ send }: Props) =>  (
  <>
   <PromptKernelInstallMain send={send} />
   <PromptKernelInstallStatus />
  </>
);

export default PromptKernelInstall;
