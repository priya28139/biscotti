import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";
import { RecipeContext, RecipeProvider } from "./context/RecipeContext";

function App() {
  const APP_URI = `https://www.themealdb.com/api/json/v1/1/search.php?f=`;
  const recipeContext = useContext(RecipeContext);
  const { recipes, setRecipes } = recipeContext;
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    let allRecipes = [];
    const allLetters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    let firstLetter = "";
    for (var i = 0; i < allLetters.length; i++) {
      firstLetter = allLetters[i];
      const response = await fetch(APP_URI + firstLetter);
      const data = await response.json();
      if (data) {
        //console.log(data.meals);
        for (var j = 0; j < data.meals?.length; j++) {
          allRecipes.push(data.meals[j]);
        }
      }
    }
    setRecipes({ meals: allRecipes });
  };

  useEffect(() => {
    //console.log("recipes changed in App.js");
    //console.log(recipes);
  }, [recipes]);

  return (
    <Router>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RecipeList type="all" />
        </Route>
        <Route path="/recipes/:id" component={Recipe}></Route>
        <Route path="/favorites">
          <RecipeList type="favorites" />
        </Route>
      </Switch>
    </Router>
  );
}

export default () => {
  return (
    <RecipeProvider>
      <App />
    </RecipeProvider>
  );
};
