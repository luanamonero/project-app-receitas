import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import ReceitasContext from '../Context/ReceitasContext';
import RadioButton from './RadioButton';

function Header({ title, children }) {
  const { visibleSearch, setSearchValue } = useContext(ReceitasContext);
  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  };

  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <Link to="/perfil" className="navbar-brand">
          <img
            className="d-inline-block align-top"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Ícone de perfil"
          />
        </Link>

        <h2
          data-testid="page-title"
        >
          { title }
        </h2>
        { children }
        { visibleSearch
          && <input
            name="searchInput"
            type="text"
            data-testid="search-input"
            onChange={ handleChange }
          />}
      </nav>
      <RadioButton />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};
export default Header;
