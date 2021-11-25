/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReceitasContext from '../Context/ReceitasContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { urlIdDrink, urlNameComidas } from '../helper/helper';
import DrinksIngredients from '../Components/DrinksIngredients';

const copy = require('clipboard-copy');

function BebidasDetalhes() {
  const { dataIdCard, getCardById, getAPIname } = useContext(ReceitasContext);
  const { id } = useParams();
  const [isFavorite, setIsfavorite] = useState(false);
  const [isCopyed, setIsCopyed] = useState(false);
  let getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => { getCardById(urlIdDrink, id); }, []);
  useEffect(() => { getAPIname(urlNameComidas, ''); }, []);

  useEffect(() => {
    if (!localStorage.favoriteRecipes) {
      setIsfavorite(false);
    } else if (dataIdCard.drinks) {
      const verifyIfExists = getStorage.some((obj) => obj.id
      === dataIdCard.drinks[0].idDrink);
      setIsfavorite(verifyIfExists);
    }
  }, [dataIdCard]);

  const getLocalStorage = () => {
    const { idDrink, strCategory, strDrink,
      strAlcoholic, strDrinkThumb } = dataIdCard.drinks[0];
    getStorage = [...getStorage,
      { id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb }];
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(getStorage));
  };

  const verifyStorage = () => {
    const { idDrink, strCategory, strAlcoholic,
      strDrink, strDrinkThumb } = dataIdCard.drinks[0];
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([{ id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb }]));
    } else { getLocalStorage(); }
  };

  const handleShare = () => {
    copy(window.location.href);
    setIsCopyed(true);
  };

  const handleFavorite = () => {
    setIsfavorite(!isFavorite);
    if (dataIdCard.drinks) {
      verifyStorage();
    }
  };

  return (
    <section>
      <span>{isCopyed ? 'Link copiado!' : null}</span>
      {dataIdCard.drinks && dataIdCard.drinks
        .map(({ strDrink, idDrink, strDrinkThumb }) => (
          <div
            key={ idDrink }
          >
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid="recipe-photo"
              className="section-detalhes-img"
            />
            <div className="card-body card-detalhes">
              <h5 className="card-text" data-testid="recipe-title">{strDrink}</h5>
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
            <DrinksIngredients />
          </div>
        )) }
    </section>
  );
}

export default BebidasDetalhes;
