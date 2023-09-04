import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useTheme} from 'styled-components';
import textLogo from '../assets/images/logo/logo.png';
import {Row} from './Row';
import {Text} from './Text';
import {Image} from './Image';

export const Header = React.memo(function() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Row justifyContent={'space-between'}
         alignItems={'center'}
         height={'80px'}
         padding={'0 30px'}
         backgroundColor={theme.backgroundColors.primary}>
      <Image src={textLogo} action={() => navigate('/')}/>
      <Row width={'50%'}>
        <Row width={'fit-content'} action={() => navigate('/')}>
          <Text fontSize={'19px'} color={theme.text.secondaryColor} padding={'30px'}>Home</Text>
        </Row>
        <Row width={'fit-content'} action={() => navigate('/components')}>
          <Text fontSize={'19px'} color={theme.text.secondaryColor} padding={'30px'}>Components</Text>
        </Row>
      </Row>
    </Row>
  );
});
