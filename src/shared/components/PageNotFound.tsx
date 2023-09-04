import React from 'react';
import {Row} from './Row';

export const PageNotFound = React.memo(function() {
  return (
    <Row justifyContent={'center'}>
      <div>404: PAGE NOT FOUND!</div>
    </Row>
  );
});
