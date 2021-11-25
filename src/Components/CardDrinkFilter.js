import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../Context/ReceitasContext';

const CardDrinkFilter = () => {
  const { dataFilterCategory } = useContext(ReceitasContext);
  const NUMBER = 12;

  return (
    <section className="display-card">
      {dataFilterCategory.drinks && dataFilterCategory.drinks.slice(0, NUMBER)
        .map(({ strDrink, idDrink, strDrinkThumb }, index) => (
          <Link
            key={ idDrink }
            to="/bebidas"
          >
            <div
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
              className="card div-card col-sm-2 card-food"
            >
              <input
                type="image"
                className="card-img-top"
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
              <div className="card-body">
                <h5
                  className="card-text"
                  data-testid={ `${index}-card-name` }
                >
                  {strDrink}
                </h5>
              </div>
            </div>
          </Link>
        ))}
    </section>);
};

export default CardDrinkFilter;
