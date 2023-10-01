import React, { useContext, useState } from 'react';
import { Context } from '../index';
import config from '../config';
import { deleteUser, getAvatarUrl, updateUser } from '../api/UserApi';
import { Link } from 'react-router-dom';
import { FEED_ROUTE } from '../utils/consts';


const UserSettings = () => {
    const {userStore} = useContext(Context);
    const user= userStore.getUserData;
    const avatarUrl = getAvatarUrl(user.email);
    const [name, setName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [avatar, setAvatar] = useState(avatarUrl);
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const passwordsMatch = password === confirmPassword & password;
    const [editFlag, setEditFlag] = useState(false);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const dataUrl = e.target.result;
              setAvatar(dataUrl);
            };
            reader.readAsDataURL(selectedFile);
          }
    };

    const editUserProfile = (e) =>{
        
        let imageFile = '';
        if (avatarUrl != avatar){
            imageFile = avatar.split(',')[1];
        }
        else{
            imageFile = false;
        }
        updateUser(name, lastName, email, password, imageFile);
    }

    const deleteUserProfile = (e) =>{
        deleteUser();
        window.location.reload();
    }

    const editName = () =>{
        if (!editFlag){
            document.getElementById('settings-name').style.display = 'none'
            document.getElementById('settings-name-input').style.display = 'block'
            document.getElementById('settings-lastName-input').style.display = 'block'
        }
        else{
            document.getElementById('settings-name').style.display = 'block'
            document.getElementById('settings-name-input').style.display = 'none'
            document.getElementById('settings-lastName-input').style.display = 'none'
        }
        setEditFlag(!editFlag)
    }

    return (
        <div>
            <div className="back-btn">
                <Link to="#" onClick={() => window.history.back()}>Назад</Link>
            </div>
            <section className="settings-section">
            <div className="settings-container">
            <form onSubmit={editUserProfile}>
                <h1 className="admin-title">Настройки</h1>
                <div className="user-info" style={{flexDirection:'column'}}>
                <div className="user-avatar">
                    <img src={avatar} alt="" className="user-avatar-img" />
                    <div className="edit-container">
                        <input className="edit-photo" id="file-input" type="file" name="avatar" accept="image/*" onChange={handleFileChange}></input>
                        <img src="./img/edit.svg" alt="" className="user-avatar-edit" />
                    </div>
                    
                </div>
                <div className="user-name" style={{fontSize:'25px'}}>
                    <span id="settings-name">{name + ' ' + lastName}</span> 
                    <input placeholder="Имя" id="settings-name-input" onInput={(e) => setName(e.target.value)} className="settings-form-name-edit" type="text" style={{display:'none'}} ></input>
                    <input placeholder="Фамилия" id="settings-lastName-input" onInput={(e) => setLastName(e.target.value)} className="settings-form-name-edit" type="text" style={{display:'none', marginLeft:'5px'}} ></input>
                    <img style={{cursor:'pointer'}} src="./img/pencil.svg" alt="" onClick={editName}/>
                </div>
            </div>
            <div className="settings-form">
                <input onInput={(e) => setEmail(e.target.value)} type="email" placeholder="Электронная почта" required/>
                <input onInput={(e) => setPassword(e.target.value)} type="password" placeholder="Новый пароль" required/>
                <input onInput={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Подтвердите пароль" required/>
                {password && (
                <>
                    {passwordsMatch ? (
                    ''
                    ) : (
                    <span style={{ color: 'red', paddingTop: '12px' }}>Пароли не совпадают</span>
                    )}
                    <div></div>
                </>
                )}
                <button type="submit" className="settings-form-btn" >Сохранить</button>
                <button type="button" className="settings-form-btn delete" onClick={deleteUserProfile}>Удалить аккаунт</button>
                </div>
            </form>
            </div>
            </section>
        </div>
    )
}

export default UserSettings;