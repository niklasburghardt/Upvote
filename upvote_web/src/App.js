import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/MainSection/Home';
import Login from './pages/Login';
import Header from './pages/Header';
import { QueryClient, QueryClientProvider } from 'react-query';

import Navigation from './pages/Navigation/Navigation';
import styled from 'styled-components';
import MainSection from './pages/MainSection';
import VotableDetail from './pages/MainSection/VotableDetail';
import UserDetail from './pages/MainSection/UserDetail';
import InfoSection from './pages/InfoSection';
import Followed from './pages/MainSection/Followed';
import { InputField } from './components/stateful_components/InputField';
import StoryView from './components/stateful_components/StoryView';
import { PopUpProvider } from './context/PopUpContext';
import Backdrops from './pages/Backdrops';


const queryClient = new QueryClient()

function App() {


  return (
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <PopUpProvider>
            <AppBody>


              <Navigation />
              <Routes>

                <Route element={<MainSection page={<Home />} title="Home" />} path="/" exact />

                <Route element={<MainSection page={<Followed />} title="Followed" />} path="/followed" exact />
                <Route path='/votable/:id' element={<MainSection page={<VotableDetail />} title="Votable" />} />
                <Route element={<Login />} path="login/" exact />
                <Route element={<MainSection page={<UserDetail />} />} path="/:username" exact />
              </Routes>
              <InfoSection />
              <InputField page={<StoryView />} />
              <Backdrops />
            </AppBody>
          </PopUpProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  );

}

const AppBody = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0px auto;

`

export default App;
