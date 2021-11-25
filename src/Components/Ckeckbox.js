/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReceitasContext from '../Context/ReceitasContext';
import getIngredients, { addValueDrinkInStorage,
  addValueFoodInStorage } from '../helper/functionsHelper';

const CheckBox = ({ idValue, checkValue }) => {
  const [isChecked, setIsChecked] = useState('checked');
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();
  const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { setIsFinishedRecip, dataIdCard } = useContext(ReceitasContext);

  const verifyPageFood = (key) => {
    if (localStorage.inProgressRecipes) {
      const valueStorage = getStorage[key];
      const verify = valueStorage[id]
        ? valueStorage[id].some((item) => item === checkValue)
        : false;
      setIsChecked(verify === true ? 'checked' : false);
    } else { setIsChecked(false); }
  };

  useEffect(() => {
    if (pathname === `/comidas/${id}/in-progress`) {
      verifyPageFood('meals');
    } else { verifyPageFood('cocktails'); }
  }, []);

  const verifiFoodChecked = (key, arrayIngredients) => {
    const getRecipsInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const foodObj = getRecipsInStorage[key];
    if (getRecipsInStorage && foodObj[id].length
      === arrayIngredients.length) setIsFinishedRecip(false);
  };

  useEffect(() => {
    if (pathname === `/comidas/${id}/in-progress`) {
      const getRecipsInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const foodValues = Object.entries(dataIdCard.meals[0]);
      const ingredientsValue = getIngredients(foodValues);
      const foodObj = getRecipsInStorage && getRecipsInStorage.meals;
      const quantRecipChecked = foodObj && foodObj[id] ? foodObj[id].length : 0;
      if (ingredientsValue.length === quantRecipChecked) setIsFinishedRecip(false);
    } else {
      const getRecipsInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const foodValues = Object.entries(dataIdCard.drinks[0]);
      const ingredientsValue = getIngredients(foodValues);
      const foodObj = getRecipsInStorage && getRecipsInStorage.cocktails;
      const quantRecipChecked = foodObj && foodObj[id] ? foodObj[id].length : 0;
      if (ingredientsValue.length === quantRecipChecked) setIsFinishedRecip(false);
    }
  }, []);

  const handleChange = ({ target }) => {
    if (target.checked) {
      setIsChecked('checked');
    } else { setIsChecked(false); }

    const { checked, value } = target;
    if (pathname === `/comidas/${id}/in-progress` && checked) {
      const foodValues = Object.entries(dataIdCard.meals[0]);
      const ingredientsValue = getIngredients(foodValues);
      addValueFoodInStorage(value, 'meals', 'cocktails', id);
      verifiFoodChecked('meals', ingredientsValue);
    }
    if (pathname !== `/comidas/${id}/in-progress` && checked) {
      const foodValues = Object.entries(dataIdCard.drinks[0]);
      const ingredientsValue = getIngredients(foodValues);
      addValueDrinkInStorage(value, 'meals', 'cocktails', id);
      verifiFoodChecked('cocktails', ingredientsValue);
    }
  };

  return (
    <input
      type="checkbox"
      id={ idValue }
      onChange={ handleChange }
      defaultChecked={ isChecked }
      checked={ isChecked }
      value={ checkValue }
    />
  );
};

CheckBox.propTypes = {
  idValue: PropTypes.number.isRequired,
  checkValue: PropTypes.number.isRequired,
};

export default CheckBox;
