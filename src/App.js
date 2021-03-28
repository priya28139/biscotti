import React, { useEffect, useState } from "react";
import AppBar from "./components/AppBar";
import RecipeList from "./components/RecipeList";

const App = () => {
  const APP_URI = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  const [recipes, setRecipes] = useState([]);
  const [searchString, setSearchString] = useState("");
  useEffect(() => {
    getRecipes();
  }, [searchString]);

  const getRecipes = async () => {
    const response = await fetch(APP_URI + searchString);
    const data = await response.json();
    setRecipes(data);
  };

  return (
    <>
      <AppBar setSearchString={setSearchString} />
      <RecipeList meals={recipes} />
    </>
  );
};

export default App;
