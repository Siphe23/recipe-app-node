import React from 'react';

const RecipeCard = ({ recipe, onDelete, onEdit }) => (
  <div className="recipe-card">
    <img src={recipe.image} alt={recipe.name} />
    <h3>{recipe.name}</h3>
    <p>{recipe.ingredients}</p>
    <button onClick={onEdit}>Edit</button>
    <button onClick={() => onDelete(recipe._id)}>Delete</button>
  </div>
);

export default RecipeCard;








