import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ReceitasContext from '../Context/ReceitasContext';
import getIngredients, { getQuantIngredients } from '../helper/functionsHelper';
import CheckboxIngredients from './CheckboxIngredients';

function FoodProgresso() {
  const { dataIdCard } = useContext(ReceitasContext);
  const cardValues = Object.entries(dataIdCard.meals[0]);
  const ingredientsValue = getIngredients(cardValues);
  const quantIngredients = getQuantIngredients(cardValues);
  const { isFinishedRecip } = useContext(ReceitasContext);
  const history = useHistory();

  const createLocalStorage = (obj) => {
    const { idMeal, strCategory, strArea, strMeal, strMealThumb, strTags } = obj;
    const limitDate = 10;
    // Realizado consulta no site https://qastack.com.br/programming/1531093/how-do-i-get-the-current-date-in-javascript
    const date = new Date().toJSON().slice(0, limitDate).replace(/-/g, '/');
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: date,
      tags: strTags ? strTags.split(',') : [],
    }]));
  };

  const getLocalStorage = (obj) => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    const { idMeal, strCategory, strArea, strMeal, strMealThumb, strTags } = obj;
    const limitDate = 10;
    const date = new Date().toJSON().slice(0, limitDate).replace(/-/g, '/');
    localStorage.setItem('doneRecipes', JSON.stringify([...storage, {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: date,
      tags: strTags ? strTags.split(',') : [],
    }]));
  };

  const verifyLocalStorage = (obj) => {
    if (!localStorage.doneRecipes) {
      createLocalStorage(obj);
    } else {
      getLocalStorage(obj);
    }
  };

  const handleClick = (obj) => {
    verifyLocalStorage(obj);
    history.push('/receitas-feitas');
  };

  return (
    <section>
      { dataIdCard.meals && dataIdCard.meals
        .map(({ idMeal: idFood, strCategory, strInstructions }) => (
          <div key={ idFood }>
            <h5 data-testid="recipe-category">
              {strCategory}
            </h5>
            <CheckboxIngredients
              arrayIngredients={ ingredientsValue }
              arrayMeasure={ quantIngredients }
            />
            <h5>Instructions</h5>
            <p data-testid="instructions">{strInstructions}</p>
            <section className="section-btn-recipe">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                className="btn-startRecipe"
                disabled={ isFinishedRecip }
                onClick={ () => handleClick(dataIdCard.meals[0]) }
              >
                Finalizar Receita
              </button>
            </section>
          </div>
        ))}
    </section>
  );
}

export default FoodProgresso;
