import React, { useState, useContext } from "react";
export const RecipeContext = React.createContext();

export const RecipeProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  return (
    <RecipeContext.Provider
      value={{
        favorites,
        setFavorites,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
