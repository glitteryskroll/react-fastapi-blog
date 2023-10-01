import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { useRouteLoaderData } from 'react-router-dom';
import { profile } from '../api/UserApi';
import {Context} from '../index'
import Header from '../components/Header';
import BlogsFeed from '../components/BlogsFeed';

import '../styles/css/feed.css'; // Ensure the correct path to your CSS file
const FeedApp = (props) => {
  const apiUrl = props.apiUrl;
  const {userStore} = useContext(Context);
  const [userData, setUserData] = useState()
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

  useEffect(() => {
    if (userData){
      console.log('user data', userData);
      setLoading(false);
    };
    // setLoading(false);
  }, [userData]);

  return (
    <div>
        {loading ? 
        <div>Загрузка</div>
        :
        <div>
          <Header>
          </Header>

          <BlogsFeed className="feed-container">
          </BlogsFeed>
        </div>
        }
        
    </div>
  );
};

export default FeedApp;