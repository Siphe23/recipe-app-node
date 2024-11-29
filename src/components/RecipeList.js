import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const RecipeList = () => {
  // Define state hooks for recipes, loading, and error
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the recipes from the server API
  useEffect(() => {
    fetch('http://localhost:300/api/v1/recipes') // Update to server route
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data.recipes); // Ensure this matches your backend response
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching recipes');
        setLoading(false);
      });
  }, []);

  // Handle recipe deletion
  const handleDelete = (id) => {
    fetch(`http://localhost:300/api/v1/recipes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete recipe');
        }
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== id) // Adjust if `_id` is used in the backend
        );
      })
      .catch((error) => console.error('Error deleting recipe:', error));
  };

  return (
    <div className="recipe-list">
      {loading && <p>Loading recipes...</p>}
      {error && <p>{error}</p>}
      {recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id} // Adjust to use `_id` or the appropriate identifier
              recipe={recipe}
              onDelete={() => handleDelete(recipe._id)} // Adjust based on how the recipe is identified
            />
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
