import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ReceitasContext from '../Context/ReceitasContext';

function CardFoodFavorite({ name, category, image, area, index, id }) {
  const [isFavorited, setIsFavorited] = useState();
  const { setFavoriteList } = useContext(ReceitasContext);

  // https://pt.stackoverflow.com/questions/229222/como-excluir-um-produto-com-id-no-sessionstorage
  function removeItem(idCard) {
    const obj = JSON.parse(localStorage.getItem('favoriteRecipes')) || {}; // localStorage Nome
    for (let i = 0; i < obj.length; i += 1) { // loop para buscar o id
      if (obj[i].id === idCard) { // verifica id
        obj.splice(i, 1); // remove item
        setFavoriteList(obj);
        break; // finaliza o loop
      }
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(obj)); // reescreve a localStorage
  }

  const setFavorited = (idFood) => {
    if (isFavorited) {
      setIsFavorited(false);
    } else {
      removeItem(idFood);
      setIsFavorited(true);
    }
  };

  return (
    <section className="display-card">
      <div className="card div-card col-sm-2 card-food">
        <img
          className="card-img-top"
          src={ image }
          alt={ `imagem do prato ${name}` }
          data-testid={ `${index}-horizontal-image` }
        />
        <h3 data-testid={ `${index}-horizontal-name` }>
          {name}
        </h3>
        <p data-testid={ `${index}-horizontal-top-text` }>
          Categoria:
          {`${area} - ${category}`}
        </p>
        <button type="button">
          <img
            src={ shareIcon }
            alt="Imagem de compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button type="button" onClick={ () => setFavorited(id) }>
          <img
            src={ isFavorited ? whiteHeartIcon : blackHeartIcon }
            alt="Imagem de coração para favoritar e desfavoritar"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    </section>
  );
}

CardFoodFavorite.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardFoodFavorite;
