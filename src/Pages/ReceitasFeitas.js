import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ReceitasFeitas() {
  const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const [isCopyed, setIsCopyed] = useState(false);
  const [recips, setRecips] = useState(getLocalStorage);
  const history = useHistory();

  const handleShare = () => {
    copy(window.location.href);
    setIsCopyed(true);
  };

  const handleRiderct = (type, id) => {
    if (type === 'comida') {
      return history.push(`/comidas/${id}`);
    }
    return history.push(`/bebidas/${id}`);
  };

  const handleFilter = (filter) => {
    if (filter === 'food') {
      const filters = getLocalStorage.filter((recip) => recip.type === 'comida');
      setRecips(filters);
    } else if (filter === 'drink') {
      const filters = getLocalStorage.filter((recip) => recip.type === 'bebida');
      setRecips(filters);
    } else {
      const filters = getLocalStorage;
      setRecips(filters);
    }
  };

  return (
    <section>
      <Header title="Receitas Feitas" />
      <section>
        <span>{isCopyed ? 'Link copiado!' : null}</span>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('drink') }
        >
          Drinks
        </button>
      </section>
      <div>
        {recips && recips.map((recip, index) => {
          const { image, category, name, doneDate, tags,
            area, type, alcoholicOrNot, id } = recip;
          return (
            <div key={ index }>
              <input
                className="section-detalhes-img"
                type="image"
                alt="img-recip"
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                onClick={ () => handleRiderct(type, id) }
              />
              <input
                type="image"
                className="d-inline-block align-top"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Ícone de compartilhamento"
                onClick={ handleShare }
              />
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${type === 'comida' ? area : alcoholicOrNot} - ${category}`}
              </h4>
              <button
                type="button"
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => handleRiderct(type, id) }
              >
                {name}
              </button>
              <span
                data-testid={ `${index}-horizontal-done-date` }
              >
                {doneDate}
              </span>
              { tags.map((tag, tagIndex) => (
                <span
                  key={ tagIndex }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ReceitasFeitas;
