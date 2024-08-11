import React from 'react';
import '../pages/RecipeCard.css';

const RecipeCard = ({ recipe, onDelete }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.picture} alt={recipe.name} className="recipe-image" />
      <h3 className="recipe-name">{recipe.name}</h3>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookTime}</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p>{recipe.instructions.substring(0, 100)}...</p>
      <button className="get-recipe-button">Get Recipe</button>
      <button className="delete-button" onClick={() => onDelete(recipe.id)}>Delete</button>
    </div>
  );
};

export default RecipeCard;

































