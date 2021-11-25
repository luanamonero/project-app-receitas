/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReceitasContext from '../Context/ReceitasContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { urlIdFood, urlNameBebidas } from '../helper/helper';
import FoodProgresso from '../Components/FoodProgresso';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function ProgressoComidas() {
  const { dataIdCard, getCardById, getAPIname } = useContext(ReceitasContext);
  const { id } = useParams();
  const [isFavorite, setIsfavorite] = useState(false);
  const [isCopyed, setIsCopyed] = useState(false);
  let getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => { getCardById(urlIdFood, id); }, []);
  useEffect(() => { getAPIname(urlNameBebidas, ''); }, []);

  useEffect(() => {
    if (!localStorage.favoriteRecipes) {
      setIsfavorite(false);
    } else if (dataIdCard.meals) {
      const verifyIfExists = getStorage.some((obj) => obj.id
      === dataIdCard.meals[0].idMeal);
      setIsfavorite(verifyIfExists);
    }
  }, [dataIdCard]);

  const createStorage = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = dataIdCard.meals[0];
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([{
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }]));
  };

  const receiveLocalStorage = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = dataIdCard.meals[0];
    getStorage = [...getStorage,
      { id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb }];
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(getStorage));
  };

  const handleFavorite = () => {
    setIsfavorite(!isFavorite);
    if (!localStorage.favoriteRecipes) {
      createStorage();
    } else {
      receiveLocalStorage();
    }
  };

  const handleShare = () => {
    const message = window.location.href.replace('/in-progress', '');
    copy(message);
    setIsCopyed(true);
  };

  return (
    <section>
      <span>{isCopyed ? 'Link copiado!' : null}</span>
      {dataIdCard.meals && dataIdCard.meals
        .map(({ idMeal, strMeal, strMealThumb }) => (
          <div
            key={ idMeal }
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid="recipe-photo"
              className="section-detalhes-img"
            />
            <div className="card-body card-detalhes">
              <h5 className="card-text" data-testid="recipe-title">{strMeal}</h5>
              <div>
                <input
                  type="image"
                  className="d-inline-block align-top"
                  data-testid="share-btn"
                  src={ shareIcon }
                  alt="Ícone de compartilhamento"
                  onClick={ handleShare }
                />
                <input
                  type="image"
                  className="d-inline-block align-top"
                  data-testid="favorite-btn"
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  alt="Ícone de favoritar"
                  onClick={ handleFavorite }
                />
              </div>
            </div>
            <FoodProgresso />
          </div>
        )) }
    </section>
  );
}

export default ProgressoComidas;
