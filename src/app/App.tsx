import React from 'react';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {Header} from '../shared/components/Header';
import {Home} from '../pages/Home';
import {Scoring} from '../pages/Scoring';
import {PageNotFound} from '../shared/components/PageNotFound';
import {store} from './store';

function App() {
  return (
    <Provider store={store}>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/components'} element={<Scoring/>}/>
        <Route path={'*'} element={<PageNotFound/>}/>
      </Routes>
    </Provider>
  );
}

export default App;
