/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import ButtonSearch from '../Components/ButtonSearch';
import CardFood from '../Components/CardFood';
import CardFoodFilter from '../Components/CardFoodFilter';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ReceitasContext from '../Context/ReceitasContext';
import { urlCategoriesFood,
  urlIngredientsComidas, urlFilterFood, urlNameComidas } from '../helper/helper';

function Receitas() {
  const { getAPIingredient, getApiCategories,
    dataCategories, getApiFilter,
    getAPIname, dataApi } = useContext(ReceitasContext);
  const maxCategories = 5;
  const [isFilter, setIsFilter] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!dataApi.meals) {
      getAPIingredient(urlIngredientsComidas, '');
    }
  }, []);

  useEffect(() => { getApiCategories(urlCategoriesFood); }, []);

  const handleClickCategory = (param) => {
    getApiFilter(urlFilterFood, param);
    if (param === category) {
      setIsFilter(false);
    }
    if (param !== category) {
      setCategory(param);
      setIsFilter(true);
    }
  };

  const getAllFoods = () => {
    getAPIname(urlNameComidas, '');
    setCategory('All');
    setIsFilter(false);
  };

  return (
    <div>
      <Header title="Comidas">
        <ButtonSearch />
      </Header>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ getAllFoods }
      >
        All

      </button>
      {dataCategories.meals && dataCategories.meals.slice(0, maxCategories)
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
      { isFilter ? <CardFoodFilter /> : <CardFood />}
      <Footer />
    </div>
  );
}

export default Receitas;
