const getIngredients = (array) => {
  const mapIngredients = array.map((item) => item.join('-'));
  return mapIngredients
    .filter((item) => item.includes('strIngredient') && item[item.length - 1] !== '-');
};

export const getNumberIngredients = (array) => array
  .map((_ingredient, index) => index + 1);

export const getQuantIngredients = (array) => {
  const mapQuant = array.map((item) => item.join('-'));
  return mapQuant
    .filter((item) => item.includes('strMeasure') && item[item.length - 1] !== '-');
};

export const addValueFoodInStorage = (value, foodKey, drinkKey, id) => {
  let getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ [drinkKey]: {},
        [foodKey]: { [id]: [Number(value)] } }));
  } else {
    const foodStorage = getStorage[foodKey];
    getStorage = { ...getStorage,
      [foodKey]: { ...foodStorage,
        [id]: foodStorage[id]
          ? [...foodStorage[id], Number(value)]
          : [Number(value)] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(getStorage));
  }
};

export const addValueDrinkInStorage = (value, foodKey, drinkKey, id) => {
  let getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ [drinkKey]: { [id]: [Number(value)] },
        [foodKey]: { } }));
  } else {
    const drinkStorage = getStorage[drinkKey];
    getStorage = { ...getStorage,
      [drinkKey]: { ...drinkStorage,
        [id]: drinkStorage[id]
          ? [...drinkStorage[id], Number(value)]
          : [Number(value)] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(getStorage));
  }
};

export default getIngredients;
