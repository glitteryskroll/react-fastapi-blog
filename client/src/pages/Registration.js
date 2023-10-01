import React, { useState } from 'react';
import '../styles/css/registration.css';
import { registerUser } from '../api/UserApi';
let passwords = {};
const Registration = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        family: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name == 'passwordA' || name == 'passwordB'){
            passwords[name] = value
            if (passwords.passwordA == passwords.passwordB){
                console.log('rabotaet')
                setFormData({ ...formData, password: value });
            }
            else{
                setFormData({ ...formData, password: undefined });
            };
        }
        else{
            setFormData({ ...formData, [name]: value });
        }
        console.log(formData);
        console.log(passwords);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the registration data to the backend
        registerUser(formData);
    };

    return (
        <html lang="en">
        <head>
            {/* ... (head content) ... */}
        </head>
        <body>
            <section className="auth-section">
            <div className="auth-container">
                <h3>Регистрация</h3>
                <form onSubmit={handleSubmit} className="form-auth">
                <input type="text" name="name" id="name" placeholder="Имя" required onChange={handleInputChange} />
                <input type="text" name="family" id="family" placeholder="Фамилия" required onChange={handleInputChange} />
                <input type="email" name="email" id="email" placeholder="Электронная почта" required onChange={handleInputChange} />
                <input type="password" name="passwordA" id="passwordA" placeholder="пароль" required onChange={handleInputChange} />
                <input type="password" name="passwordB" id="passwordB" placeholder="Повторите пароль" required onChange={handleInputChange} />

                <button type="submit" className="auth-btn">Зарегистрироваться</button>
                </form>
                <span>
                Уже есть аккаунт? <a href="auth.html">Войти</a>
                </span>
            </div>
            </section>
        </body>
        </html>
    );
};

export default Registration;