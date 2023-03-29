import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import CreateAccountForm from './components/Auth/CreateAccountForm';
import ReadBoardComponent from './components/board/ReadBoardComponent';
import ListBoardComponent from './components/board/ListBoardComponent';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/auth_context';
import "./App.css"
import CreateBoardComponent from './components/board/CreateBoardComponent';   
  
function App() {
  const authCtx = useContext(AuthContext);

    return (
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "/:menuCd" element = {<ListBoardComponent/>}></Route>
        <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateAccountForm />} />
        <Route path="/login/*" 
          element={authCtx.isLoggedIn ? <Navigate to='/' /> : <AuthPage />}
        />
        <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage />} />
        <Route path = "/read-board/:id" element = {<ReadBoardComponent/>}></Route>
        <Route path = "/create-board/:id" element = {<CreateBoardComponent/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
