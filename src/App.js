import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";
import ProgressBar from "./components/ProgressBar";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

export default function App() {
  const APP_URI = `https://www.themealdb.com/api/json/v1/1/search.php?f=`;
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [darkState, setDarkState] = useState(false);
  const [progress, setProgress] = useState(0);
  const theme = createMuiTheme({
    palette: {
      type: darkState ? "dark" : "light",
    },
  });

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
      setProgress(((i + 1) / 26) * 100);
    }
    setRecipes({ meals: allRecipes });
  };

  useEffect(() => {
    setFilteredRecipes(recipes);
    console.log(recipes);
  }, [recipes]);

  useEffect(() => {
    console.log("favorites changed!");
    console.log(favorites);
  }, [favorites]);

  useEffect(() => {
    console.log("filtered favorites changed!");
    console.log(filteredFavorites);
  }, [filteredFavorites]);

  useEffect(() => {
    if (searchString === "") {
      setFilteredRecipes(recipes);
    } else {
      let filtered = [];
      for (var i = 0; i < recipes.meals?.length; i++) {
        if (
          recipes.meals[i].strMeal
            .toLowerCase()
            .match(new RegExp(searchString.toLowerCase()))
        ) {
          filtered.push(recipes.meals[i]);
        }
      }
      setFilteredRecipes({ meals: filtered });
    }
  }, [searchString]);

  useEffect(() => {
    if (searchString === "") {
      setFilteredFavorites(favorites);
    } else {
      let filteredFavorites = [];
      for (var i = 0; i < favorites?.length; i++) {
        if (
          favorites[i].strMeal
            .toLowerCase()
            .match(new RegExp(searchString.toLowerCase()))
        ) {
          filteredFavorites.push(favorites[i]);
        }
      }
      setFilteredFavorites(filteredFavorites);
    }
  }, [searchString, favorites]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar
          searchString={searchString}
          setSearchString={setSearchString}
          darkState={darkState}
          setDarkState={setDarkState}
        />

        <Switch>
          <Route path="/" exact>
            {progress !== 100 && <ProgressBar progress={progress} />}
            <RecipeList
              recipes={filteredRecipes}
              favorites={filteredFavorites}
              setFavorites={setFavorites}
              darkState={darkState}
              type="all"
            />
          </Route>
          <Route path="/recipes/:id" component={Recipe}></Route>
          <Route path="/favorites">
            <RecipeList
              recipes={filteredRecipes}
              favorites={filteredFavorites}
              setFavorites={setFavorites}
              darkState={darkState}
              type="favorites"
            />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
