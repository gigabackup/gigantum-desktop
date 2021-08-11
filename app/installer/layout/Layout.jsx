// @flow
import React, { Component } from 'react';
// Components
import Faq from '../components/faq/Faq';
import Header from '../components/header/Header';
import ProgressBar from '../components/progressbar/ProgressBar';
// assets
import './Layout.scss';

type Props = {
  children: React.Node,
  machineState: {
    context: {
      header: string
    },
    value: string
  },
  progress: number
};

export default class Container extends Component<Props> {
  props: Props;

  render() {
    const { children, machineState, progress } = this.props;
    console.log(machineState.context);
    return (
      <div data-tid="container">
        <Header header={ machineState.context && machineState.context.header ? machineState.context.header : 'Install'} />
        <div className="Layout__Body">
          <Faq currentState={machineState.value} />
          {children}
        </div>
        <ProgressBar progress={progress} />
      </div>
    );
  }
}
