import React from 'react';
import {Row} from './Row';

export const PageNotFound = React.memo(function() {
  return (
    <Row width={'100%'}>
      <Row justifyContent={'center'} margin={'20px'}>404: PAGE NOT FOUND!</Row>
    </Row>
  );
});
