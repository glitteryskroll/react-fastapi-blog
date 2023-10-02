import React, { useContext } from 'react';
import { Context } from '../index';
import { getAvatarUrl } from '../api/UserApi';
import { Link } from 'react-router-dom';
import { SETTINGS_ROUTE } from '../utils/consts';

const Header = () => {
  const {userStore} = useContext(Context);
  const user= userStore.getUserData;
  const avatarUrl = getAvatarUrl(user.email);

  return (
    <div className="header">
      <div className="user-name-header">
              <div className="user-img">
                  <img src={avatarUrl} alt="Нет"/>
              </div>
              <span>{user.first_name} {user.last_name}</span>
              <div className="user-setting-btn" id="setting-btn">
                  <Link to={SETTINGS_ROUTE} ><img src="./img/settings.svg" alt=""/></Link>
              </div>
      </div>
    </div>
  );
};

export default Header;