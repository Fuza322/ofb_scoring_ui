import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    text-decoration: none;
    list-style-type: none;
    font-family: 'ALSSectorRegular', sans-serif;
    background-color: #FFFFFF;
    //primary text color
    color: #000000;
    ::selection {
      background-color: #C39114;
      color: #FFFFFF;
    }
  }
`;

const theme = {
  text: {
    fontSize: '16px',
    secondaryColor: '#54608D',
    tertiaryColor: '#C39114',
  },
  buttons: {
    primary: {
      backgroundColor: '#C39114',
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: '#E2E5EB',
      color: '#101213',
    },
    disabled: {
      backgroundColor: 'transparent',
      borderColor: '#D9D8DD',
      color: '#D9D8DD',
    },
  },
  backgroundColors: {
    primary: '#F4F5F7',
    secondary: '#C39114',
  },
  shared: {
    dividerColor: '#A3A8C1',
    borderRadius: '8px',
  },
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles/>
        <App/>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
