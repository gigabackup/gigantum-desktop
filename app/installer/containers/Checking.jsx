// @flow
import React, { Component } from 'react';
// containers
import Layout from './Layout';
// componenets
import CheckDockerMain from '../components/main/CheckDockerMain';
import CheckDockerStatus from '../components/status/CheckDockerStatus';
// assets
import './Container.scss';

export default class Checking extends Component<Props> {
  props: Props;

  render() {
    const { machine, message } = this.props;
    return (
      <div data-tid="container">
        <Layout
          currentState={machine.value}
          message={message}
          progress={1}
          main={<CheckDockerMain />}
          status={<CheckDockerStatus />}
        />
      </div>
    );
  }
}
