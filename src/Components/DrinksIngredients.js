import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReceitasContext from '../Context/ReceitasContext';
import getIngredients, { getQuantIngredients } from '../helper/functionsHelper';
import UlIngredients from './UlIngredients';

function DrinksIngredients() {
  const { dataIdCard, dataApi } = useContext(ReceitasContext);
  const [isInprogress, setIsInProgress] = useState(false);
  const cardValues = Object.entries(dataIdCard.drinks[0]);
  const ingredientsValue = getIngredients(cardValues);
  const quantIngredients = getQuantIngredients(cardValues);
  const maxSugestions = 6;
  const sugestions = dataApi.meals && dataApi.meals.slice(0, maxSugestions);
  const { idDrink } = dataIdCard.drinks[0];
  const history = useHistory();
  const { id } = useParams();

  const handleInitRecip = () => {
    history.push(`/bebidas/${id}/in-progress`);
  };

  useEffect(() => {
    if (!localStorage.inProgressRecipes) {
      setIsInProgress(false);
    } else {
      const recipsInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setIsInProgress(idDrink in recipsInStorage.cocktails);
    }
  }, []);

  return (
    <section>
      { dataIdCard.drinks && dataIdCard.drinks
        .map(({ idDrink: idValue, strCategory, strInstructions, strAlcoholic }) => (
          <div key={ idValue }>
            <h5 data-testid="recipe-category">
              {strCategory}
              <span>{strAlcoholic}</span>
            </h5>
            <UlIngredients
              arrayIngredients={ ingredientsValue }
              arrayMeasure={ quantIngredients }
            />
            <h5>Instructions</h5>
            <p data-testid="instructions">{strInstructions}</p>
            <h3>Recomendadas</h3>
            <section className="section-carousel">
              { sugestions && sugestions
                .map(({ strMeal, strCategory: category, strMealThumb }, index) => (
                  <div key={ index } className="div-carousel">
                    <h3 data-testid={ `${index}-recomendation-title` }>{strMeal}</h3>
                    <h3 data-testid={ `${index}-recomendation-card` }>{category}</h3>
                    <img src={ strMealThumb } alt="img drink" />
                  </div>
                ))}
            </section>
            <section className="section-btn-recipe">
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btn-startRecipe"
                onClick={ handleInitRecip }
              >
                { !isInprogress
                  ? 'Iniciar Receita' : 'Continuar Receita' }
              </button>

            </section>
          </div>
        ))}
    </section>
  );
}

export default DrinksIngredients;
