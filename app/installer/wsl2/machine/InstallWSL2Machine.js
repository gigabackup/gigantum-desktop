import { Machine } from 'xstate';
import installer from '../../../libs/Installer';

const WSLMachine = Machine({
  id: 'WSL2',
  initial: 'idle',
  context: {
    retries: 0
  },
  states: {
    idle: {
      on: {
        check_compatibility: 'check_compatibility'
      }
    },
    // check for WSL compatibility
    check_compatibility: {
      invoke: {
        id: 'check_compatibility',
        src: () => installer.checkCompatibilityWSL(),
        onDone: {
          // if compatible, check if installeda
          target: 'check_WSL_install'
        },
        onError: {
          // if compatible, check if installed
          target: 'proceed_install'
        }
      }
    },
    // check to see if WSL is installed
    check_WSL_install: {
      id: 'check_WSL_install',
      src: () => installer.checkWSLInstallStatus(),
      onDone: {
        // If WSL is installed AND ready to use, proceed installer
        target: 'check_kernel_install'
      },
      onError: {
        // If WSL is uninstalled, prompt to install
        target: 'prompt_wsl_install'
      }
    },

    check_kernel_install: {
      id: 'check_kernel_install',
      src: () => installer.checkKernalInstall(),
      onDone: {
        // If WSL is installed AND ready to use, proceed installer
        target: 'check_wsl_repo'
      },
      onError: {
        // If WSL is uninstalled, prompt to install
        target: 'install_kernel'
      }
    },
    // prompt user
    prompt_wsl_install: {
      on: {
        // on user accepting prompt
        RESOLVE: 'check_restart_require',
        // on user rejecting prompt
        REJECT: 'proceed_install'
      }
    },
    // check to see if WSL was installed but was not ready to use
    check_restart_require: {
      on: {
        // if WSL was installed but not ready to use
        RESOLVE: 'prompt_restart',
        // WSL not installed at all
        // WSL not installed at all
        REJECT: 'enable_WSL'
      }
    },
    // install kernal
    install_kernel: {
      on: {
        // if kernal installs sucessfully, proceed installer
        RESOLVE: 'check_wsl_repo',
        // if kernal fails to install, error state
        REJECT: 'kernel_install_failed'
      }
    },

    // kernal installer error state
    kernel_install_failed: {
      on: {
        // try to install kernal again
        RETRY: {
          target: 'install_kernel'
        }
      }
    },

    // attempt to install WSL
    enable_WSL: {
      on: {
        // on success, prompt a restart
        RESOLVE: 'prompt_restart',
        // on failure, error state
        REJECT: 'enable_wsl_failed'
      }
    },

    // wsl installer error state
    enable_wsl_failed: {
      on: {
        // try to enable WSL again
        RETRY: {
          target: 'enable_WSL'
        }
      }
    },

    // restart prompt
    prompt_restart: {
      on: {
        // user accepts prompt
        RESOLVE: 'restart_required'
        // should rejecting this prompt be possible?, unsure if we want this option
        // REJECT: 'close_installer'
      }
    },
    // Checks for existance of wsl repository
    check_wsl_repo: {
      on: {
        // if wsl is set up to use ubuntu 20.04, check to see if user group exists
        RESOLVE: 'check_repo_user',
        // if wsl repo doesn't exist, prompt the install
        REJECT: 'prompt_download_ubuntu_repo'
      }
    },
    // Prompts the download and ubuntu repo
    prompt_download_ubuntu_repo: {
      on: {
        // user clicks button to initiate downlaod
        RESOLVE: 'downloading_ubuntu_repo',
      }
    },
    // loading state for downloading ubuntu repo
    downloading_ubuntu_repo: {
      on: {
        // switches to install loading state
        RESOLVE: 'install_ubuntu_repo',
        // something in download goes wrong, error state
        REJECT: 'download_ubuntu_failed'
      }
    },
    // error state when downloading ubuntu fails
    download_ubuntu_failed: {
      on: {
        // prompt user to try again
        RETRY: 'downloading_ubuntu_repo',
      }
    },
    // loading state for installing ubuntu repo and configuring it with WSL
    install_ubuntu_repo: {
      on: {
        // after installing ubuntu repo and configuring it to wsl, check for user group creation
        RESOLVE: 'check_repo_user',
        // install fails, prompt user to try again
        REJECT: 'install_ubuntu_failed',
      }
    },
    // error state for installing ubuntu and configuring it with wsl
    install_ubuntu_failed: {
      on: {
        // prompt user to try again
        RETRY: 'install_ubuntu_repo',
      }
    },
    // prompt user to follow instructions and wait for user creation within the repo. Launches Ubuntu shell for user
    check_repo_user: {
      on: {
        // when user is created, proceed with install
        RESOLVE: 'proceed_install',
      }
    },
    restart_required: {
      type: 'final'
      // will require system restart
    },
    proceed_install: {
      type: 'final'
      // will proceed with installer
    }
  }
});

export default WSLMachine;
