import React, { useContext } from 'react';
import ReceitasContext from '../Context/ReceitasContext';
import searchIcon from '../images/searchIcon.svg';

const ButtonSearch = () => {
  const { setVisibleSarch, visibleSearch } = useContext(ReceitasContext);
  return (
    <button
      className="img-search"
      type="button"
      onClick={ () => setVisibleSarch(!visibleSearch) }
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Lupa: Botão de pesquisa"
      />
    </button>
  );
};

export default ButtonSearch;
