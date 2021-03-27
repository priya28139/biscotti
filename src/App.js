import React, { useEffect, useState } from "react"
import AppBar from "./components/AppBar"

const App = () => {
  const APP_ID = "b55d2702"
  const APP_KEY = "24c1e01a946fc7309dacda08beb748bb"
  const APP_URI = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = async () => {
    const response = await fetch(APP_URI)
    const data = await response.json()
    console.log(data.hits)
    setRecipes(data.hits)
  }

  return (
    <>
      <AppBar />
    </>
  )
}

export default App
