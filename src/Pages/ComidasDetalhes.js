/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReceitasContext from '../Context/ReceitasContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import FoodIngredients from '../Components/FoodIngredients';
import { urlIdFood, urlNameBebidas } from '../helper/helper';

const copy = require('clipboard-copy');

function ComidaDetalhes() {
  const { dataIdCard, getAPIname, getCardById } = useContext(ReceitasContext);
  const [isFavorite, setIsfavorite] = useState(false);
  const { id } = useParams();
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

  const handleShare = () => {
    copy(window.location.href);
    setIsCopyed(true);
  };

  const getLocalStorage = () => {
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

  const verifyStorage = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = dataIdCard.meals[0];
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([{ id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb }]));
    } else { getLocalStorage(); }
  };

  const handleFavorite = () => {
    setIsfavorite(!isFavorite);
    if (dataIdCard.meals) {
      verifyStorage();
    }
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
            <FoodIngredients />
          </div>
        )) }
    </section>
  );
}

export default ComidaDetalhes;
