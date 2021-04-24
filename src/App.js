import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";

export default function App() {
  const APP_URI = `https://www.themealdb.com/api/json/v1/1/search.php?f=`;
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchString, setSearchString] = useState("");

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
        console.log(data.meals);
        for (var j = 0; j < data.meals?.length; j++) {
          allRecipes.push(data.meals[j]);
        }
      }
    }
    setRecipes({ meals: allRecipes });
  };

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    if (searchString === "") {
      setFilteredRecipes(recipes);
    } else {
      let filtered = [];
      for (var i = 0; i < recipes.meals?.length; i++) {
        if (recipes.meals[i].strMeal.match(new RegExp(searchString))) {
          filtered.push(recipes.meals[i]);
        }
      }
      setFilteredRecipes({ meals: filtered });
    }
  }, [searchString]);

  return (
    <Router>
      <AppBar setSearchString={setSearchString} />
      <Switch>
        <Route path="/" exact>
          <RecipeList
            recipes={filteredRecipes}
            favorites={{ meals: favorites }}
            setFavorites={setFavorites}
            type="all"
          />
        </Route>
        <Route path="/recipes/:id" component={Recipe}></Route>
        <Route path="/favorites">
          <RecipeList
            recipes={filteredRecipes}
            favorites={{ meals: favorites }}
            setFavorites={setFavorites}
            type="favorites"
          />
        </Route>
      </Switch>
    </Router>
  );
}
