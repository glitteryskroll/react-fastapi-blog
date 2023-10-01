import React, { useContext } from 'react';
import { Context } from '../index';
import { getAvatarUrl } from '../api/UserApi';

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
                  <a href="settings.html"><img src="./img/settings.svg" alt=""/></a>
              </div>
      </div>
    </div>
  );
};

export default Header;