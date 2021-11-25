import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ReceitasContext from '../Context/ReceitasContext';
import { urlIngredientsBebidasNoFilter, urlIngredientsBebidas } from '../helper/helper';

function ExplorarBebidasIngredientes() {
  const { getIngredientsList,
    ingredientsList, getAPIingredient } = useContext(ReceitasContext);
  const NUMBER = 12;
  const history = useHistory();

  useEffect(() => { getIngredientsList(urlIngredientsBebidasNoFilter); }, []);

  const handleClick = async (param) => {
    await getAPIingredient(urlIngredientsBebidas, param);
    history.push('/bebidas');
  };

  return (
    <section>
      <Header title="Explorar Ingredientes" />
      <section className="display-card">
        {ingredientsList.drinks && ingredientsList.drinks.slice(0, NUMBER)
          .map(({ idIngredient, strIngredient1 }, index) => (
            <div
              key={ idIngredient }
              data-testid={ `${index}-ingredient-card` }
              className="card div-card col-sm-2 card-food"
            >
              <input
                className="card-img-top"
                type="image"
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt={ strIngredient1 }
                data-testid={ `${index}-card-img` }
                onClick={ () => handleClick(strIngredient1) }
              />
              <div className="card-body">
                <h5
                  className="card-text"
                  data-testid={ `${index}-card-name` }
                >
                  {strIngredient1}

                </h5>
              </div>
            </div>))}
      </section>
      <Footer />
    </section>
  );
}

export default ExplorarBebidasIngredientes;
