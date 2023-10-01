import React, { useState } from 'react';
import '../styles/css/style.css'; // Импортируем стили
import { authUser } from '../api/UserApi';

const Auth = (props) => {
  const apiUrl = props.apiUrl
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    

    // Отправляем POST запрос на бэкенд
    authUser(email, password)
  };

  return (
    <div>
      <section className="auth-section">
        <div className="auth-container">
          <h3>Авторизация</h3>
          <form onSubmit={handleSubmit} className="form-auth">
            <input
              type="email"
              placeholder="Электронная почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-btn">Войти</button>
          </form>
          <span>
            Нет аккаунта? <a href="registration.html">Создать</a>
          </span>
        </div>
      </section>
    </div>
  );
};

export default Auth;