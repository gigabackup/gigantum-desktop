// vendor
import React from 'react';

type Props = {
  send: () => void
};

const Main = ({ send }: Props) => (
    <section className="InstallWSL2__main">
      <h5>Install Kernel</h5>
      <p>Kernel needs to be installed because, blah blah blah</p>

      <div className="InstallWSL2__buttons">
        <button
          onClick={() => { send('RESOLVE')}}
          type="button"
        >
          Install Kernel
        </button>
        <button
          onClick={() => { send('REJECT')}}
          type="button"
        >
          Skip Kernel Install
        </button>
      </div>
    </section>
  );


export default Main;
