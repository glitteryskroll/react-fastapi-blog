// src/App.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes,useNavigate  } from 'react-router-dom';
import Auth from './pages/Auth';  // Импортируем компонент страницы аутентификации
import Registration from './pages/Registration';
import config from './config';
import Settings from './pages/Setting';
import { Context } from './index';
import { profile } from './api/UserApi';

const apiUrl = config.backendUrl;
const App = () => {
  const {userStore} = useContext(Context);
  const [loading, setLoading] = useState(true)
  async function setUser() {
    const data = await profile();
    userStore.setUserData(data);
    console.log(userStore.getUserData);
    setLoading(false);
  }
  useEffect(() => {
    setUser();
  }, []);

  return (
      <Router>
        {loading ? '' : 
          <Routes>
            <Route  path="/auth" element={<Auth ></Auth>} />
            <Route  path="/registration" element={<Registration ></Registration>} />  
            <Route  path="/settings" element={<Settings ></Settings>} />
           
          </Routes>
        }
      </Router>
  );
};

export default App;