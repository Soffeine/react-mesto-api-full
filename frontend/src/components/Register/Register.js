import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import AuthForm from "../AuthForm/AuthForm";

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail (e) {
      setEmail(e.target.value)
    }
    
    function handleChangePassword (e) {
      setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(password, email);
    }

    return (
        <>
            <Header link='/sign-in'
            linkName='Войти'
            email=''/>
            <AuthForm email={ email }
            password={ password }
            title="Регистрация"
            buttonText="Зарегестрироваться"
            onChangeEmail={ handleChangeEmail }
            onChangePassword={ handleChangePassword }
            onSubmit={ handleSubmit }>
                <p className="auth-form__signin">Уже зарегестрированы? <Link to="/sign-in" className="auth-form__signin_link">Войти</Link></p>
            </AuthForm>
        </>
    )
}

export default Register;