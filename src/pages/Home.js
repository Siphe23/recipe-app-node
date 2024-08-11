import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import '../pages/Home.css';

const Home = ({ searchQuery, setSearchQuery }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/recipes')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/recipes/${id}`, {
      method: 'DELETE',
    })
      .then(() => setRecipes(recipes.filter((recipe) => recipe.id !== id)))
      .catch((error) => console.error('Error deleting recipe:', error));
  };

  return (
    <div className="home-container">
      <h1>Recipe Finder App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery(searchQuery)}>Search</button>
      </div>
      <Link to="/add-recipe">
        <button className="add-recipe-button">Add Recipe</button>
      </Link>

      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
