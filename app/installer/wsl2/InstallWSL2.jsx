// @flow
import React, { useCallback, useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
// States
import installWSL2Machine from './machine/InstallWSL2Machine';
// constants
import { ERROR, SUCCESS } from '../machine/InstallerConstants';
import { INSTALL } from './machine/InstallWSL2Constants';
// containers
import Layout from '../layout/Layout';
// libs
import wslStatus from '../../libs/wslStatus';
// componenets
import Idle from './states/idle/Idle';
import Compatibility from './states/compatibility/CheckCompatibility';
import CheckWSL2Install from './states/checkWSL2Install/CheckWSL2Install';
import CheckKernelInstall from './states/checkKernelInstall/CheckKernelInstall';
// css
import './InstallWSL2.scss';

const InstallWSL2 = ({
  installerInterface,
  machine,
  messenger,
  storage,
  transition,
}) => {
  // machine
  const [state, send] = useMachine(installWSL2Machine);
  // installer methods
  const [progress, setProgress] = useState(0);
  const [wslLookupComplete, setWslLookupComplete] = useState(0);




  /**
    @param {string} eventType
    sets transition of the state machine
  */
  const installWSL2Transition = useCallback(eventType => {
    console.log('remove me')
  });

  /**
   * @param {}
   *  deny kernal instlal
   */
  const denyKernal = useCallback(() => {
    storage.set('wslConfigured', true);
    transition(SUCCESS, {
      message: 'Checking For Docker'
    });
  }, [storage, transition]);

  /**
   * @param {}
   *  changes state when installing begins
   */
  const installKernal = useCallback(() => {
    const installCallback = response => {
      if (response.success) {
        storage.set('wslConfigured', true);
        transition(SUCCESS, {
          message: 'Checking For Docker'
        });
      } else {
        transition(ERROR, {
          message: 'WSL2 Setup Failed'
        });
      }
    };

    installWSL2Transition(SUCCESS);

    installerInterface.installKernal(installCallback);
  }, [storage, transition, installWSL2Transition, installerInterface]);

  /**
   * @param {}
   *  changes state when installing begins
   */
  const optOut = useCallback(() => {
    transition(SUCCESS, {
      message: 'Checking For Docker'
    });
  }, [transition]);

  /**
   * @param {}
   *  changes state when installing begins
   */
  const startInstall = useCallback(() => {

    const installErrorHandler = () => {
      transition(ERROR, {
        message: 'WSL2 Setup Failed'
      });
    };

    const callback = response => {
      if (response.success) {
        setTimeout(() => {
          installWSL2Transition(SUCCESS);
        }, 3000);
      } else {
        installErrorHandler();
      }
    };

    installWSL2Transition(INSTALL);

    installerInterface.enableSubsystem(callback);
  }, [transition, installWSL2Transition, installerInterface]);


  console.log(state);
  // useEffect(() => {
  //   const wslExistsCallback = () => {
  //       installWSL2Transition(SUCCESS);
  //     this.setState({ wslComplete: true });
  //   };
  //   wslStatus(wslExistsCallback, wslExistsCallback, () =>
  //     setState({ wslLookupComplete: true });
  //   );
  // }, []);


  const renderMap = {
    idle: (<Idle send={send} />),
    check_compatibility: (<Compatibility send={send} />),
    check_WSL_install: (<CheckWSL2Install />),
    check_kernel_install: (<CheckKernelInstall />),
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
