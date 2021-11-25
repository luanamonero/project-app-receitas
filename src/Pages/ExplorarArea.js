import React, { useContext, useEffect, useState } from 'react';
import ButtonSearch from '../Components/ButtonSearch';
import CardArea from '../Components/CardArea';
import CardFood from '../Components/CardFood';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ReceitasContext from '../Context/ReceitasContext';
import { urlExploreByArea, urlIngredientsComidas,
  urlFilterByArea } from '../helper/helper';

function ExplorarArea() {
  const { getIngredientsByArea,
    ingredientsByArea, getAPIingredient, getFilterByArea } = useContext(ReceitasContext);
  const [areaValue, setAreaValue] = useState('');
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => { getIngredientsByArea(urlExploreByArea); }, []);
  useEffect(() => { getAPIingredient(urlIngredientsComidas, ''); }, []);

  useEffect(() => {
    if (areaValue === 'All') {
      getAPIingredient(urlIngredientsComidas, '');
      setIsFilter(false);
    }

    if (areaValue && areaValue !== 'All') {
      getFilterByArea(urlFilterByArea, areaValue);
      setIsFilter(true);
    }
  }, [areaValue]);

  return (
    <div>
      <Header title="Explorar Origem">
        <ButtonSearch />
      </Header>
      <select
        data-testid="explore-by-area-dropdown"
        name=""
        value={ areaValue }
        onChange={ ({ target: { value } }) => setAreaValue(value) }
      >
        <option data-testid="All-option" value="All">All</option>
        {ingredientsByArea.meals && ingredientsByArea.meals.map(({ strArea }) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ strArea }
            value={ strArea }
          >
            {strArea}
          </option>
        ))}
      </select>
      { isFilter ? <CardArea /> : <CardFood /> }
      <Footer />
    </div>
  );
}

export default ExplorarArea;
