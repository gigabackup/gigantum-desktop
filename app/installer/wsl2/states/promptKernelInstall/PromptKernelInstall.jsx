// vendor
import React from 'react';
// componenets
import PromptWSLInstallMain from './main/PromptWSLInstallMain';
import PromptWSLInstallStatus from './status/PromptWSLInstallStatus';

type Props = {
  send: () => void
};

const PromptWSLInstall = ({ send }: Props) =>  (
  <>
   <PromptWSLInstallMain send={send} />
   <PromptWSLInstallStatus />
  </>
);

export default PromptWSLInstall;
