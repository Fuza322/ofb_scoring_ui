import React from 'react';
import {Row} from '../shared/components/Row';
import {Column} from '../shared/components/Column';
import {Text} from '../shared/components/Text';

export const Scoring = React.memo(function() {
  return (
    <Column alignItems={'flex-start'} margin={'20px'}>
      <Row width={'fit-content'}>
        <Text fontSize={'40px'}>Scoring:</Text>
      </Row>
    </Column>
  );
});
