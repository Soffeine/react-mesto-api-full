import React from 'react'

function AuthForm({ email, password, title, buttonText, children, onChangeEmail, onChangePassword, onSubmit }) {
    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <div className="auth-form__container">
            <h2 className="auth-form__title">{title}</h2>
            <input className="auth-form__input" type="email" placeholder="Email" id="email" name="email" value={email || ''} onChange={onChangeEmail} required />
            <span className="auth-form__span"></span>
            <input className="auth-form__input" type="password" placeholder="Пароль" id="password" name="password" value={password || ''} onChange={onChangePassword} required />
            <span className="auth-form__span"></span>
            <button className="auth-form__submit" type="submit">{buttonText}</button>
            </div>
            { children }
        </form >
  )
}

export default AuthForm;