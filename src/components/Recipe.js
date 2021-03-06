import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { CardMedia } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: "75vh",
    [theme.breakpoints.up("sm")]: {
      height: "100%",
    },
  },
}));

export default function Recipe({ match, location }) {
  const classes = useStyles();
  const [meal, setMeal] = useState(location.state?.meal);
  const [ingredientsAndMeasures, setIngredientsAndMeasures] = useState([]);
  const { id } = useParams();
  const [mealNotFound, setMealNotFound] = useState(false);

  const getMeal = async () => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (response.data.meals) {
      setMeal(response.data.meals[0]);
    } else {
      setMealNotFound(true);
    }
  };
  useEffect(() => {
    if (!meal) {
      getMeal();
    }
  }, []);

  useEffect(() => {
    if (meal) {
      console.log(meal);
      const currentIngredientsAndMeasures = [];
      const indexedValues = Object.values(meal);
      for (var i = 9; i <= 21; i++) {
        if (!indexedValues[i] || indexedValues[i] === "") {
          break;
        }
        currentIngredientsAndMeasures.push({
          ingredient: indexedValues[i],
          measure: indexedValues[i + 20],
        });
      }
      setIngredientsAndMeasures(currentIngredientsAndMeasures);
    }
  }, [meal]);

  const result = mealNotFound ? (
    <Typography
      variant="h2"
      component="h1"
      style={{ textAlign: "center", fontSize: "3rem", marginTop: "1em" }}
    >
      Sorry, the meal you're looking for could not be found.
    </Typography>
  ) : (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        style={{
          width: "100%",
          maxWidth: "1250px",
          margin: "1em auto",
          alignItems: "stretch",
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h2"
            component="h1"
            style={{ textAlign: "center" }}
          >
            {meal?.strMeal}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardMedia
            className={classes.media}
            image={meal?.strMealThumb}
            title={meal?.strMeal}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TableContainer component={Paper}>
            <Table aria-label="ingredients table">
              <TableHead>
                <TableRow>
                  <TableCell>Ingredient</TableCell>
                  <TableCell align="right">Measure</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredientsAndMeasures?.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.ingredient}
                    </TableCell>
                    <TableCell align="right">{row.measure}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" style={{ marginTop: "1em" }}>
            {meal?.strInstructions}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );

  return <> {result}</>;
}
