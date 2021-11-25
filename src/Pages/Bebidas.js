import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import ButtonSearch from '../Components/ButtonSearch';
import ReceitasContext from '../Context/ReceitasContext';
import { urlCategoriesDrinks, urlIngredientsBebidasInital,
  urlFilterDrink,
  urlNameBebidas } from '../helper/helper';
import Footer from '../Components/Footer';
import CardDrink from '../Components/CardDrink';
import CardDrinkFilter from '../Components/CardDrinkFilter';

function Bebidas() {
  const { getAPIingredient, getApiCategories,
    dataCategories, getApiFilter, getAPIname,
    dataFilterCategory, dataApi } = useContext(ReceitasContext);
  const maxCategories = 5;
  const [isFilter, setIsFilter] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!dataApi.drinks) { getAPIingredient(urlIngredientsBebidasInital, ''); }
  }, []);
  useEffect(() => { getApiCategories(urlCategoriesDrinks); }, []);
  useEffect(() => {
    if (dataFilterCategory.drinks && dataFilterCategory.drinks.length > 0) {
      setIsFilter(true);
    }
  }, []);

  const handleClickCategory = (param) => {
    getApiFilter(urlFilterDrink, param);
    if (param === category) {
      setIsFilter(false);
    }
    if (param !== category) {
      setCategory(param);
      setIsFilter(true);
    }
  };

  const getAllDrinks = () => {
    getAPIname(urlNameBebidas, '');
    setCategory('All');
    setIsFilter(false);
  };

  return (
    <div>
      <Header title="Bebidas">
        <ButtonSearch />
      </Header>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ getAllDrinks }
      >
        All

      </button>
      {dataCategories.drinks && dataCategories.drinks.slice(0, maxCategories)
        .map(({ strCategory }, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleClickCategory(strCategory) }
          >
            {strCategory}
          </button>
        ))}
      { isFilter ? <CardDrinkFilter /> : <CardDrink />}
      <Footer />
    </div>
  );
}

export default Bebidas;
