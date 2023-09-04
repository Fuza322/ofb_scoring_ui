import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Header} from './shared/components/Header';
import {Home} from './pages/Home';
import {Scoring} from './pages/Scoring';
import {PageNotFound} from './shared/components/PageNotFound';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/components'} element={<Scoring/>}/>
        <Route path={'*'} element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
