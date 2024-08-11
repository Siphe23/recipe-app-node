import React, { useState, useEffect } from 'react';
import RecipeForm from '../components/RecipeForm';
import '../pages/UpdateRecipeForm.css';

const UpdateRecipeForm = ({ match, history }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${match.params.id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [match.params.id]);

  const handleSubmit = (updatedRecipe) => {
    fetch(`http://localhost:3001/recipes/${match.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe),
    })
      .then(() => history.push('/'))
      .catch((error) => console.error('Error updating recipe:', error));
  };

  return (
    <div>
      <h1>Update Recipe</h1>
      {recipe && <RecipeForm onSubmit={handleSubmit} />}
    </div>
  );
};

export default UpdateRecipeForm;



