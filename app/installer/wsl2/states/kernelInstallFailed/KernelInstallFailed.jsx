// vendor
import React from 'react';

type Props = {
  send: () => void
};


const Main = ({send}: Props) => (
    <section className="InstallWSL2__main">
      <h5>Kernel</h5>
      <p>Kernel install failed try again.</p>

      <button
        className="Btn--primary"
        onClick={() => send('RETRY')}
        type="button"
      >
        Retry Kernel Install
       </button>
    </section>
  );


export default Main;
