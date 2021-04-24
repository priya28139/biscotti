import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, favorites, setFavorites, type }) {
  useEffect(() => {
    console.log("Favorites from RecipeList: ", favorites);
  }, [favorites]);
  let counter = -1;
  const recipeCards =
    type === "all"
      ? recipes.meals?.map((meal) => {
          counter++;
          if (counter === 16) {
            counter = 0;
          }
          return (
            <RecipeCard
              meal={meal}
              counter={counter}
              key={meal.idMeal}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          );
        })
      : favorites.map((meal) => {
          counter++;
          if (counter === 16) {
            counter = 0;
          }
          return (
            <RecipeCard
              meal={meal}
              counter={counter}
              key={meal.idMeal}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          );
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
