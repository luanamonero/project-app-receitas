const ingredientAPI = async (url, param) => {
  const ingredientes = await fetch(`${url}${param}`);
  const results = await ingredientes.json();
  return results;
};

export const nameAPI = async (url, param) => {
  const name = await fetch(`${url}${param}`);
  const results = await name.json();
  return results;
};

export const firstLetterAPI = async (url, param) => {
  const firstLetter = await fetch(`${url}${param}`);
  const results = await firstLetter.json();
  return results;
};

export const categoriesData = async (url) => {
  const fetchCategories = await fetch(url);
  const results = await fetchCategories.json();
  return results;
};

export const filterCategory = async (url, param) => {
  const fetchFilterCategory = await fetch(`${url}${param}`);
  const results = await fetchFilterCategory.json();
  return results;
};

export const cardById = async (url, param) => {
  const fetchGetDrinkById = await fetch(`${url}${param}`);
  const results = await fetchGetDrinkById.json();
  return results;
};

export const random = async (url) => {
  const fetchRandom = await fetch(url);
  const results = await fetchRandom.json();
  return results;
};

export const ingredientsCards = async (url) => {
  const fetchIngredientsCards = await fetch(url);
  const results = await fetchIngredientsCards.json();
  return results;
};

export const recipesByArea = async (url) => {
  const fetchRecipesByArea = await fetch(url);
  const results = await fetchRecipesByArea.json();
  return results;
};

export const filterByArea = async (url, param) => {
  const fetchFilterByArea = await fetch(`${url}${param}`);
  const results = await fetchFilterByArea.json();
  return results;
};
export default ingredientAPI;
