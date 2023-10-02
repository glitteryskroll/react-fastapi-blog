// src/App.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, redirect, Navigate  } from 'react-router-dom';
import Auth from './pages/Auth';  // Импортируем компонент страницы аутентификации
import Home from './pages/Home';
import FeedApp from './pages/Feed';
import Registration from './pages/Registration';
import config from './config';
import Settings from './pages/Settings';
import { Context } from './index';
import { profile } from './api/UserApi';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import { ADMIN_ROUTES, AUTH_ROUTES, NOT_AUTH_ROUTES } from './utils/routes';
import { AUTH_ROUTE } from './utils/consts';

const apiUrl = config.backendUrl;
const App = () => {
  const {userStore} = useContext(Context);
  userStore.setIsAuth(false);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  async function setUser() {
    const data = await profile();
    userStore.setUserData(data);
    setAuth(true);
    try{
      if (data.level == 1){
        setAdmin(true)
      }
    }
    catch(e){
    }
    setLoading(false);
  }
  console.log(admin)
  useEffect(() => {
    setUser();
  }, []);
  return (
      <Router>
        {loading ? '' : 
          <Routes>
            {auth ?
                <>
                {AUTH_ROUTES.map((route, index) => (
                    <Route  path={route.path} key={index} element={<route.page></route.page>} />
                ))}
                </>
                :
                <></>
            }
            {
              NOT_AUTH_ROUTES.map((route, index) =>(
                <Route  path={route.path} key={index} element={<route.page></route.page>} />
              )) 
            }
            {
              admin ?
              ADMIN_ROUTES.map((route, index) =>(
                <Route path={route.path} key={index} element={<route.page admin={admin}></route.page>} />
              ))
              :
              <></> 
            }
            <Route path="*" element={<Navigate to={AUTH_ROUTE}/>}/>
          </Routes>
        }
      </Router>
  );
};

export default App;