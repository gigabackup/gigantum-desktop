// vendor
import React, { useEffect } from 'react';
// components
import Loader from '../../../../components/loader/index';

type Props = {
  send: Function
};

const Idle = ({send}: Props) => {
    useEffect(() => {
      send('check_compatibility');
    }, []);

    return (
      <section>
        <Loader />
      </section>
    )
}


export default Idle;
