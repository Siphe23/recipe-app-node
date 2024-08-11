import React from 'react';
import RecipeForm from '../components/RecipeForm';

const AddRecipe = () => {
  const handleSubmit = (recipe) => {
    fetch('http://localhost:3001/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then(response => response.json())
      .then(data => {
       
        console.log('Recipe added:', data);
      })
      .catch(error => console.error('Error adding recipe:', error));
  };

  return (
    <div>
      <h1>Add a New Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddRecipe;

