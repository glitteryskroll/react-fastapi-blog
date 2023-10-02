import config from "../config";
import axios from "axios";

const apiUrl = config.backendUrl;

export const profile = async () => {
    try {
        const response = await axios.post(`${apiUrl}/user/info`, null, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true  // for sending credentials (cookies)
        });

        return response.data.user;
      } catch (error) {
        console.error('Error:', error);
      }
}

export const getAvatarUrl = (email) =>{
    const avatarImage = apiUrl + '/user/avatar/' + email +'?' + new Date().getTime();
    return avatarImage
}

export const updateUser = async (name, lastName, email, password, avatar) => {
    try {
        const data = {
            name: name,
            last_name: lastName,
            email: email,
            password : password,
            avatar: avatar
        }
        const response = await axios.post(`${apiUrl}/user/edit-profile`, data, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true  // for sending credentials (cookies)
        });

        return response.data.user;
      } catch (error) {
        console.error('Error:', error);
      }
}

export const authUser = async (email, password) => {
    const data = {
        email,
        password
    };
    return await fetch(apiUrl + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })
    .then(response => response.json())
    .then(data => {
        return true;
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

export const deleteUser = async () => {
  return await fetch(apiUrl + '/user/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  .then(response => response.json())
  .then(data => {
      console.log('Response from server:', data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
};

export const registerUser = async (formData) => {
  return await fetch(apiUrl + '/user/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then((response)=>{
        if (response.status == 200){
          return true
        }
        else{
          if (response.status == 409){
            alert('Пользователь с таким email уже имеется');
          }
          else{
            alert(response.status)
          }
          return false
        }
    })
    .catch(error => {
      console.error('Error registering:', error);
    });
}