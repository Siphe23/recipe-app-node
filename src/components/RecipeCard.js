import React from 'react';

const RecipeCard = ({ recipe, onDelete }) => {
  // Ensure ingredients is an array
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

  return (
    <div className="recipe-card">
      <h3>{recipe.name}</h3>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <button onClick={() => onDelete(recipe.id)}>Delete</button>
    </div>
  );
};

export default RecipeCard;



































