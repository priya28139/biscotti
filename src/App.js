import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";

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
    <Router>
      <AppBar setSearchString={setSearchString} />
      <Switch>
        <Route path="/" exact>
          <RecipeList meals={recipes} />
        </Route>
        <Route path="/recipes/:id" component={Recipe}></Route>
      </Switch>
    </Router>
  );
};

export default App;
