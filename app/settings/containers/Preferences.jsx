// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
// componenets
import Header from '../components/Header';
import Setting from '../components/Setting';
// assets
import './Preferences.scss';

const isMac = process.platform === 'darwin';
const isLinux = process.platform === 'linux';

/**
  @param {Object} props
  @param {Object} state
  gets storage info to determine text
*/
const getText = (props, state) => {
  const { storage } = props;
  let shutDownDockerText = storage.get('close.dockerConfirm');
  let launchOnStartText = props.autoLaunch;
  let gigantumConfirmText = storage.get('close.gigantumConfirm');

  if (shutDownDockerText === undefined) {
    shutDownDockerText = 'Prompt';
  } else {
    shutDownDockerText = shutDownDockerText ? 'Yes' : 'No';
  }

  gigantumConfirmText = gigantumConfirmText ? 'No' : 'Yes';
  launchOnStartText = launchOnStartText ? 'Yes' : 'No';

  return {
    shutDownDockerText: state.shutDownDockerText || shutDownDockerText,
    gigantumConfirmText: state.gigantumConfirmText || gigantumConfirmText,
    launchOnStartText: state.launchOnStartText || launchOnStartText
  };
};

/**
  @param {Object} state
  gets option data
*/
const getOptions = state => {
  const defaultOptions = ['Yes', 'No'];
  const dockerOptions = ['Yes', 'No', 'Prompt'];
  const saveDisabled =
    state.shutDownDockerText === null &&
    state.launchOnStartText === null &&
    state.gigantumConfirmText === null;

  return {
    gigantumOptions: defaultOptions,
    launchOptions: defaultOptions,
    dockerOptions,
    saveDisabled
  };
};

export default class Preferences extends Component<Props> {
  props: Props;

  state = {
    gigantumDropdownVisible: false,
    dockerDropdownVisible: false,
    launchDropdownVisible: false,
    launchOnStartText: null,
    shutDownDockerText: null,
    gigantumConfirmText: null
  };

  /**
    @param {String} section
    @param {boolean} visibility
    gets storage info to determine text
  */
  toggleDropdown = (section, visibility) => {
    this.setState({ [section]: visibility });
  };

  /**
    @param {String} section
    @param {String} text
    sets preference in state
  */
  setPreference = (section, text) => {
    this.setState({ [section]: text });
  };

  /**
    @param {} -
    resets preference in state
  */
  cancelPreference = () => {
    const { props } = this;
    props.messenger.closeSettings();
  };

  /**
    @param {} -
    saves preference in state
  */
  savePreference = () => {
    const { props, state } = this;
    const { storage } = props;
    const {
      shutDownDockerText,
      gigantumConfirmText,
      launchOnStartText
    } = state;

    if (shutDownDockerText) {
      if (shutDownDockerText === 'Yes') {
        storage.set('close.dockerConfirm', true);
      } else if (shutDownDockerText === 'No') {
        storage.set('close.dockerConfirm', false);
      } else {
        storage.set('close.dockerConfirm', undefined);
      }
    }

    if (gigantumConfirmText) {
      if (gigantumConfirmText === 'Yes') {
        storage.set('close.gigantumConfirm', false);
      } else {
        storage.set('close.gigantumConfirm', true);
      }
    }

    if (launchOnStartText) {
      if (launchOnStartText === 'Yes') {
        props.messenger.closeSettings();
        props.messenger.setAutoLaunchOn();
      } else {
        props.messenger.setAutoLaunchOff();
      }
    }

    this.cancelPreference();
  };

  render() {
    const { props, state } = this;
    const { message } = props;
    const {
      shutDownDockerText,
      gigantumConfirmText,
      launchOnStartText
    } = getText(props, state);
    const {
      gigantumOptions,
      launchOptions,
      dockerOptions,
      saveDisabled
    } = getOptions(state);
    const gigantumConfirmCSS = classNames({
      'Dropdown relative': true,
      'Dropdown--open': state.gigantumDropdownVisible,
      'Dropdown--collapsed': !state.gigantumDropdownVisible
    });

    const dockerConfirmCSS = classNames({
      'Dropdown relative': true,
      'Dropdown--open': state.dockerDropdownVisible,
      'Dropdown--collapsed': !state.dockerDropdownVisible
    });

    const launchConfirmCSS = classNames({
      'Dropdown relative': true,
      'Dropdown--open': state.launchDropdownVisible,
      'Dropdown--collapsed': !state.launchDropdownVisible
    });

    return (
      <div className="Preferences">
        <Header message={message} />
        <div className="Preferences__body">
          {!isLinux && (
            <div className="Preferences__category">
              <div className="Preferences__category-title">Startup</div>
              <Setting
                css={launchConfirmCSS}
                visible={state.launchDropdownVisible}
                settingsText="Start Gigantum Desktop at system start"
                currentText={launchOnStartText}
                options={launchOptions}
                listAction={() =>
                  this.toggleDropdown(
                    'launchDropdownVisible',
                    !state.launchDropdownVisible
                  )
                }
                itemAction={item =>
                  this.setPreference('launchOnStartText', item)
                }
              />
            </div>
          )}
          <div className="Preferences__category">
            <div className="Preferences__category-title">Shutdown</div>
            <Setting
              css={gigantumConfirmCSS}
              visible={state.gigantumDropdownVisible}
              settingsText="Show confirmation when stopping Gigantum Client"
              currentText={gigantumConfirmText}
              options={gigantumOptions}
              listAction={() =>
                this.toggleDropdown(
                  'gigantumDropdownVisible',
                  !state.gigantumDropdownVisible
                )
              }
              itemAction={item =>
                this.setPreference('gigantumConfirmText', item)
              }
            />
            {isMac && (
              <Setting
                css={dockerConfirmCSS}
                visible={state.dockerDropdownVisible}
                settingsText="Shutdown Docker on Stop"
                currentText={shutDownDockerText}
                options={dockerOptions}
                listAction={() =>
                  this.toggleDropdown(
                    'dockerDropdownVisible',
                    !state.dockerDropdownVisible
                  )
                }
                itemAction={item =>
                  this.setPreference('shutDownDockerText', item)
                }
              />
            )}
          </div>
          <div className="Preferences__buttons">
            <button
              type="button"
              className="Btn--flat"
              onClick={() => this.cancelPreference()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="Btn__Settings Btn--primary Btn--last"
              onClick={() => this.savePreference()}
              disabled={saveDisabled}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
