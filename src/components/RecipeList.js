import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/recipes/${id}`, {
      method: 'DELETE',
    })
      .then(() => setRecipes(recipes.filter((recipe) => recipe.id !== id)))
      .catch((error) => console.error('Error deleting recipe:', error));
  };

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default RecipeList;


