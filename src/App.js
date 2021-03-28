import React, { useEffect, useState } from "react";
import AppBar from "./components/AppBar";
import RecipeList from "./components/RecipeList";

const App = () => {
  const APP_URI = `https://www.themealdb.com/api/json/v1/1/search.php?s=p`;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(APP_URI);
    const data = await response.json();
    setRecipes(data);
  };

  return (
    <>
      <AppBar />
      <RecipeList meals={recipes} />
    </>
  );
};

export default App;
