import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Perfil() {
  const result = (localStorage.getItem('user'));
  const history = useHistory();

  const handleClick = (path) => history.push(path);

  const handleClickReset = (path) => {
    history.push(path);
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Perfil" />
      <Footer />
      <div className="container-perfil">
        <h3 data-testid="profile-email" className="radio-form">{result}</h3>
        <button
          data-testid="profile-done-btn"
          className="btn btn-lg btn-danger"
          type="button"
          onClick={ () => handleClick('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          data-testid="profile-favorite-btn"
          className="btn btn-lg btn-danger"
          type="button"
          onClick={ () => handleClick('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          className="btn btn-lg btn-danger"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => handleClickReset('/') }
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default Perfil;
