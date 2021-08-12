// vendor
import React from 'react';

type Props = {
  send: () => void
};

const Main = ({ send }: Props) => (
    <section className="InstallWSL2__main">
      <h5>Install WSL2?</h5>
      <p>Docker & Gigantum runs faster on WSL2, do you want to install WSL2?</p>

      <div className="InstallWSL2__buttons">
        <button
          onClick={() => { send('RESOLVE')}}
          type="button"
        >
          Install WSL2
        </button>
        <button
          onClick={() => { send('REJECT')}}
          type="button"
        >
          Skip WSL2 Install
        </button>
      </div>
    </section>
  );


export default Main;
