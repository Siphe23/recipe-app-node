import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import '../styles/UpdateRecipeForm.css';

const UpdateRecipeForm = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { id } = useParams(); // Use useParams hook to get the recipe ID from the URL

  // Fetch the recipe data from the server
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/recipes/${id}`) // Fetch the recipe by ID
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching recipe');
        setLoading(false);
      });
  }, [id]); // Re-run this effect when the `id` changes

  // Handle form submission for updating the recipe
  const handleSubmit = (updatedRecipe) => {
    fetch(`http://localhost:3001/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe), // Send the updated recipe data
    })
      .then(() => {
        history.push('/'); // Redirect to the homepage after successful update
      })
      .catch((error) => {
        console.error('Error updating recipe:', error);
        setError('Error updating recipe');
      });
  };

  return (
    <div className="update-recipe-form">
      <h1>Update Recipe</h1>
      {loading && <p>Loading recipe...</p>}
      {error && <p>{error}</p>}
      {recipe && !loading && !error && (
        <RecipeForm
          initialRecipe={recipe} // Pass the current recipe data to the form
          onSubmit={handleSubmit} // Handle form submission
        />
      )}
    </div>
  );
};

export default UpdateRecipeForm;

