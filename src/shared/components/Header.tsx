import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useTheme} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import textLogo from '../assets/images/logo/logo.png';
import {AppRootStateType} from '../../app/store';
import {LanguageType, setAppLanguageAC} from '../../app/app-reducer';
import {Row} from './Row';
import {Image} from './Image';
import {Text} from './Text';
import {Dropdown} from './Dropdown';

export const Header = React.memo(function() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const language = useSelector<AppRootStateType, LanguageType>(state => state.app.language);
  const dispatch = useDispatch();

  const languageOptions = [
    {name: 'English', value: 'En'},
    {name: 'Russian', value: 'Ru'},
    {name: 'Uzbek', value: 'Uz'},
  ];

  function setLanguage(option: LanguageType) {
    dispatch(setAppLanguageAC(option));
  }

  return (
    <Row justifyContent={'space-around'}
         alignItems={'center'}
         height={'80px'}
         padding={'0 30px'}
         backgroundColor={theme.backgroundColors.secondary}>
      <Image src={textLogo} action={() => navigate('/')}/>
      <Row width={'50%'} justifyContent={'flex-start'}>
        <Row width={'fit-content'} action={() => navigate('/')}>
          <Text fontSize={'19px'} color={theme.text.secondaryColor} padding={'30px'}>Home</Text>
        </Row>
        <Row width={'fit-content'} action={() => navigate('/components')}>
          <Text fontSize={'19px'} color={theme.text.secondaryColor} padding={'30px'}>Scoring</Text>
        </Row>
      </Row>
      {['/', ''].includes(location.pathname) && <Row width={'fit-content'}>
        <Row action={() => navigate('/')} justifyContent={'space-around'} alignItems={'center'}>
          <Text fontSize={'19px'} color={theme.text.primary} padding={'0 20px'}>Language:</Text>
          <Dropdown value={language} onChange={setLanguage} options={languageOptions}/>
        </Row>
      </Row>}
    </Row>
  );
});
