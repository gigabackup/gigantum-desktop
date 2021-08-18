// vendor
import React from 'react';
// css
import './LoaderText.scss'
import '../default/Loader.scss';

type Props = {
  header: string,
  message: string
};

const LoaderText = ({
  header,
  message,
}: Props) => (
    <section className="LoaderText">
      <div className="Loader" />
      <h5>{header}</h5>
      <p>{message}</p>
    </section>
  );

export default LoaderText;
