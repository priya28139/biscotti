import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RecipeCard from "./RecipeCard";
import { Container } from "@material-ui/core";

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
  const recipeCards = meals?.map((meal) => <RecipeCard meal={meal} />);
  return (
    <Grid
      container
      spacing={3}
      style={{
        width: "calc(100% - 2em)",
        margin: "2em auto",
      }}
    >
      {recipeCards}
    </Grid>
  );
}
