import React from 'react';
import PropTypes from 'prop-types';

const UlIngredients = ({ arrayIngredients, arrayMeasure }) => (
  <section>
    <h5>
      Ingredientes
      <ul>
        { arrayIngredients.map((ingredientValue, index) => {
          const ingredient = ingredientValue.replace('strIngredient', '')
            .replace('-', ' - ');
          return (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }

            </li>
          );
        })}
      </ul>
    </h5>
    <h5> Measure </h5>
    <ul>
      { arrayMeasure.map((measure, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {measure}

        </li>
      ))}
    </ul>
  </section>

);

UlIngredients.propTypes = {
  arrayIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  arrayMeasure: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UlIngredients;
