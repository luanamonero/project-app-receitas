import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const SIX = 6;
  const validateEmail = /\S+@\S+\.\S+/;
  const history = useHistory();

  const handleEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handlePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    return history.push('/comidas');
  };

  return (
    <section className="card2 card-container2">
      <img
        id="profile-img"
        className="profile-img-card"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="imagem-profile"
      />
      <form className="form-signin">
        <label htmlFor="email">
          Email:
          <input
            className="form-control"
            data-testid="email-input"
            onChange={ handleEmail }
            name="email"
            id="email"
            value={ email }
            type="email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            className="form-control"
            data-testid="password-input"
            id="password"
            type="password"
            name="password"
            placeholder="Senha"
            value={ password }
            onChange={ handlePassword }
          />
        </label>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !(validateEmail.test(email) && password.length > SIX) }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </section>
  );
}

export default Login;
