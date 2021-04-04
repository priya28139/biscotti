import React, { useState, useContext } from "react";
export const RecipeContext = React.createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchString, setSearchString] = useState("");

  return (
    <RecipeContext.Provider
      value={{
        favorites,
        setFavorites,
        recipes,
        setRecipes,
        searchString,
        setSearchString,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
