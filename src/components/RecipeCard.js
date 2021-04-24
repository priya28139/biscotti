import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  amber,
  blue,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { cloneDeep } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 385,
    margin: "0 auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function RecipeCard({ meal, counter, favorites, setFavorites }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [avatarColor, setAvatarColor] = useState(null);
  const [description, setDescription] = useState(null);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((favorite) => favorite.idMeal === meal.idMeal)
  );
  const color_palette = [
    red[500],
    pink[500],
    purple[500],
    deepPurple[500],
    indigo[500],
    blue[500],
    lightBlue[500],
    cyan[500],
    teal[500],
    green[500],
    lightGreen[500],
    lime[500],
    yellow[500],
    amber[500],
    orange[500],
    deepOrange[500],
  ];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    let currentFavorites;
    if (isFavorite) {
      currentFavorites = cloneDeep(favorites);
      if (!favorites.some((favorite) => favorite.idMeal === meal.idMeal)) {
        currentFavorites.push(meal);
        setFavorites(currentFavorites);
      }
    } else {
      currentFavorites = favorites?.filter((favorite) => {
        return favorite.idMeal !== meal.idMeal;
      });
      setFavorites(currentFavorites);
    }
  }, [isFavorite]);

  useEffect(() => {
    setAvatarColor(color_palette[counter]);
  }, [counter]);

  useEffect(() => {
    setDescription(meal.strInstructions.slice(0, 150).replace("\n", " "));
  }, [meal.strInstructions]);

  return (
    <Grid item xs={12} sm={6} md={4} xl={3}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              style={{ backgroundColor: avatarColor }}
            >
              {meal.strArea[0]}
            </Avatar>
          }
          title={meal.strMeal}
          subheader={meal.strCategory}
        />
        <CardMedia
          className={classes.media}
          image={meal.strMealThumb}
          title={meal.strMeal}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleAddToFavorites}
          >
            <FavoriteIcon style={{ color: isFavorite ? pink[500] : "" }} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

          <IconButton className={classes.expand} aria-label="show more">
            <Link
              to={{
                pathname: `recipes/${meal.idMeal}`,
                state: { meal: meal },
              }}
              style={{ color: "inherit" }}
            >
              <NavigateNextIcon />
            </Link>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
