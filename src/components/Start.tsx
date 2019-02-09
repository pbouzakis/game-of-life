import React from 'react';
import Button from '@material-ui/core/Button';

const Start: React.SFC = () => (
  <section>
    <p>Welcome to the Game Of Life</p>
    <Button href="/game" color="primary" variant="contained">Start!</Button>
  </section>
);

export default Start;
