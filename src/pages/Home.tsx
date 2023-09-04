import React from 'react';
import {Row} from '../shared/components/Row';
import {Column} from '../shared/components/Column';
import {Text} from '../shared/components/Text';
import {Image} from '../shared/components/Image';
import homeLogo from '../shared/assets/images/logo/homeLogo.png';

export const Home = React.memo(function() {
  return (
    <Column margin={'30px'} alignItems={'center'}>
      <Row width={'fit-content'}>
        <Text fontSize={'40px'}>Welcome to</Text>
      </Row>
      <Row width={'fit-content'}>
        <Image src={homeLogo} width={'fit-content'} maxHeight={'200px'}/>
      </Row>
    </Column>
  );
});
