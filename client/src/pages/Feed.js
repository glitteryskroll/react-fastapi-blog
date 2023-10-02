import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { profile } from '../api/UserApi';
import {Context} from '../index'
import Header from '../components/Header';
import BlogsFeed from '../components/BlogsFeed';

import '../styles/css/style.css'; // Ensure the correct path to your CSS file
import { CREATE_POST_ROUTE } from '../utils/consts';
const FeedApp = (props) => {
  const apiUrl = props.apiUrl;
  const admin = props.admin;
  const {userStore} = useContext(Context);
  const [userData, setUserData] = useState()
  const [loading, setLoading] = useState(true)
  
  async function setUser() {
    const data = await profile();
    userStore.setUserData(data);
    setLoading(false);
  }
  useEffect(() => {
    setUser();
  }, []);

  useEffect(() => {
    if (userData){
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
          <section className="feed-section">
              {admin ? 
                <Link to={CREATE_POST_ROUTE} class="feed-admin-tools">
                  Создать пост
                </Link>  
                :
                <></>
              }
              <BlogsFeed admin={admin} className="feed-container">
              </BlogsFeed>
          </section>
        </div>
        }
        
    </div>
  );
};

export default FeedApp;