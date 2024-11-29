import React, { useState, useEffect } from 'react';  
import { useParams } from 'react-router-dom';

const RecipeCard = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null); 

  useEffect(() => {
    
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [id]); 

  if (!recipe) return <div>Loading...</div>; 

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.instructions}</p>
      <p>{recipe.ingredients.join(', ')}</p>
      <img src={recipe.image} alt={recipe.name} />
    </div>
  );
};

export default RecipeCard;






















