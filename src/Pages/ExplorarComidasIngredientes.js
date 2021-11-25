import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ReceitasContext from '../Context/ReceitasContext';
import { urlIngredientsComidasNoFilter, urlIngredientsComidas } from '../helper/helper';

function ExplorarComidasIngredientes() {
  const { getIngredientsList,
    ingredientsList, getAPIingredient } = useContext(ReceitasContext);
  const NUMBER = 12;
  const history = useHistory();

  useEffect(() => { getIngredientsList(urlIngredientsComidasNoFilter); }, []);

  const handleClick = async (param) => {
    await getAPIingredient(urlIngredientsComidas, param);
    history.push('/comidas');
  };

  return (
    <section>
      <Header title="Explorar Ingredientes" />
      <section className="display-card">
        {ingredientsList.meals && ingredientsList.meals.slice(0, NUMBER)
          .map(({ idIngredient, strIngredient }, index) => (
            <div
              key={ idIngredient }
              data-testid={ `${index}-ingredient-card` }
              className="card div-card col-sm-2 card-food"
            >
              <input
                className="card-img-top"
                type="image"
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt={ strIngredient }
                data-testid={ `${index}-card-img` }
                onClick={ () => handleClick(strIngredient) }
              />
              <div className="card-body">
                <h5
                  className="card-text"
                  data-testid={ `${index}-card-name` }
                >
                  {strIngredient}

                </h5>
              </div>
            </div>))}
      </section>
      <Footer />
    </section>
  );
}

export default ExplorarComidasIngredientes;
