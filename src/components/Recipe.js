import React from "react";
const Recipe = ({ match }) => {
  const id = match.params.id;
  return <h1>Recipe ID: {id}</h1>;
};

export default Recipe;
