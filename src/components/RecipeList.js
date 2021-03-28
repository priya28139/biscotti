import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RecipeCard from "./RecipeCard";
import { Container } from "@material-ui/core";
import RecipeCardAlternative from "./RecipeCardAlternative";

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
  const { meals } = props.meals;
  let counter = -1;
  const recipeCards = meals?.map((meal) => {
    counter++;
    if (counter == 16) {
      counter = 0;
    }
    return <RecipeCard meal={meal} counter={counter} key={meal.idMeal} />;
  });
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
