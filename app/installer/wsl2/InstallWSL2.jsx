// @flow
import React from 'react';
import { useMachine } from '@xstate/react';
// States
import installWSL2Machine from './machine/InstallWSL2Machine';
// containers
import Layout from '../layout/Layout';
// componenets
import Idle from './states/idle/Idle';
import Compatibility from './states/compatibility/CheckCompatibility';
import CheckWSL2Install from './states/checkWSL2Install/CheckWSL2Install';
import CheckKernelInstall from './states/checkKernelInstall/CheckKernelInstall';
import PromptWSL2Install from './states/promptWSLInstall/PromptWSLInstall';
import PromptKernelInstall from './states/promptKernelInstall/PromptKernelInstall';
import InstallWSL2 from './states/installWSL2/InstallWSL2';


// css
import './InstallWSL2.scss';

const InstallWSL2 = ({
  machine,
  messenger,
  storage,
  transition,
}) => {
  // machine
  const [state, send] = useMachine(installWSL2Machine);
  // installer method

  const renderMap = {
    idle: (<Idle send={send} />),
    check_compatibility: (<Compatibility send={send} />),
    check_WSL_install: (<CheckWSL2Install />),
    check_kernel_install: (<CheckKernelInstall />),
    prompt_wsl_install: (<PromptWSL2Install send={send} />),
    prompt_kernel_install: (<PromptKernelInstall send={send} />),
    install_wsl: (<InstallWSL2 />)
  };

  return (
    <div data-tid="container">
      <Layout
        currentState="INSTALL_WSL2"
        section="INSTALL_WSL2"
        machineState={machine}
        message="message"
        progress={1}
      >
        {renderMap[state.value]}
      </Layout>
    </div>
  );

}

export default InstallWSL2;
