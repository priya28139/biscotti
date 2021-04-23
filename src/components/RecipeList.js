import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RecipeCard from "./RecipeCard";
import { Container } from "@material-ui/core";
import RecipeCardAlternative from "./RecipeCardAlternative";
import { RecipeContext } from "../context/RecipeContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function RecipeList(props) {
  const classes = useStyles();
  const recipeContext = useContext(RecipeContext);
  const { searchString, recipes, favorites } = recipeContext;
  const [meals, setMeals] = useState([]);
  const [recipeCards, setRecipeCards] = useState([]);

  useEffect(() => {
    if (props.type === "all") {
      setMeals(recipes);
    } else {
      setMeals(favorites);
    }
  }, [recipes, favorites]);

  useEffect(() => {
    console.log("meals changed in RecipeList");
    console.log(meals);
    let counter = -1;
    const recipeCardsLocal = meals?.meals?.map((meal) => {
      counter++;
      if (counter === 16) {
        counter = 0;
      }
      return <RecipeCard meal={meal} counter={counter} key={meal.idMeal} />;
    });

    setRecipeCards(recipeCardsLocal);
  }, [meals]);

  useEffect(() => {
    if (searchString === "") {
      if (props.type === "all") {
        setMeals(recipes);
      } else {
        setMeals(favorites);
      }
    } else {
      let filtered = [];
      if (props.type === "all") {
        filtered = recipes?.meals?.filter((meal) => {
          return (
            meal.strMeal.toString().toLowerCase().indexOf(searchString) !== -1
          );
        });
      } else {
        filtered = favorites?.meals?.filter((meal) => {
          return (
            meal.strMeal.toString().toLowerCase().indexOf(searchString) !== -1
          );
        });
      }

      setMeals({ meals: filtered });
    }
  }, [searchString]);

  return (
    <Grid
      container
      spacing={3}
      style={{
        width: "calc(100% - 1em)",
        margin: "1em auto",
      }}
    >
      {recipeCards}
    </Grid>
  );
}
