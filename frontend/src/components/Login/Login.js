import React, { useState } from "react";
import Header from "../Header/Header";
import AuthForm from "../AuthForm/AuthForm";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }


  function handleSubmit(e) {
    e.preventDefault();
    onLogin(password, email)
  }

  return (
    <>
      <Header link='/sign-up'
        linkName='Регистрация'
        email='' />
      <AuthForm password={password}
        email={email}
        title="Вход"
        buttonText="Войти"
        onChangeEmail={handleChangeEmail}
        onChangePassword={handleChangePassword}
        onSubmit={handleSubmit} />
    </>
  )
}

export default Login;