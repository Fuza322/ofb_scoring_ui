import React from 'react';
import {useSelector} from 'react-redux';
import {Row} from '../shared/components/Row';
import {Column} from '../shared/components/Column';
import {Text} from '../shared/components/Text';
import {Image} from '../shared/components/Image';
import homeLogo from '../shared/assets/images/logo/homeLogo.png';
import {AppRootStateType} from '../app/store';
import {LanguageType} from '../app/app-reducer';

export const Home = React.memo(function() {
  const language = useSelector<AppRootStateType, LanguageType>(state => state.app.language);

  const welcomeTitle = {
    En: 'Welcome to',
    Ru: 'Добро пожаловать в',
    Uz: 'Ga Xush kelibsiz',
  };

  return (
    <Column margin={'30px'} alignItems={'center'}>
      <Row width={'fit-content'}>
        <Text fontSize={'40px'}>{welcomeTitle[language.value]}</Text>
      </Row>
      <Row width={'fit-content'}>
        <Image src={homeLogo} width={'fit-content'} maxHeight={'200px'}/>
      </Row>
    </Column>
  );
});
