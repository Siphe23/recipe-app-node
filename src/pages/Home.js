import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../imge/logo.png';
import '../styles/Home.css';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    image: '',
    editMode: false,
    editId: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch recipes from the server
  useEffect(() => {
    fetch('http://localhost:3001/recipes')
        .then((response) => response.json())
        .then((data) => setRecipes(data))
        .catch((error) => console.log('Error:', error));
}, []);

    

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipeData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map((item) => item.trim()), // Convert ingredients to an array
    };

    if (formData.editMode) {
      // Update existing recipe
      fetch(`http://localhost:3001/recipes/${formData.editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      })
        .then(() => {
          const updatedRecipes = recipes.map((recipe) =>
            recipe.id === formData.editId ? recipeData : recipe
          );
          setRecipes(updatedRecipes);
          setFilteredRecipes(updatedRecipes);
          resetForm();
        })
        .catch((error) => console.error('Error updating recipe:', error));
    } else {
      // Add new recipe
      fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      })
        .then((response) => response.json())
        .then((newRecipe) => {
          setRecipes([...recipes, newRecipe]);
          setFilteredRecipes([...recipes, newRecipe]);
          resetForm();
        })
        .catch((error) => console.error('Error adding recipe:', error));
    }
  };

  const deleteRecipe = (id) => {
    fetch(`http://localhost:3001/recipes/${id}`, { method: 'DELETE' })
      .then(() => {
        const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
        setRecipes(updatedRecipes);
        setFilteredRecipes(updatedRecipes);
      })
      .catch((error) => console.error('Error deleting recipe:', error));
  };

  const editRecipe = (id) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    setFormData({
      ...recipeToEdit,
      ingredients: recipeToEdit.ingredients.join(', '), // Convert array to string for form
      editMode: true,
      editId: id,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    setFilteredRecipes(recipes);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      ingredients: '',
      instructions: '',
      image: '',
      editMode: false,
      editId: null,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="home-container">
      <header className="App-header">
        <div className="recipe-form">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{formData.editMode ? 'Edit Recipe' : 'Add Recipe'}</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label>Ingredients (comma-separated):</label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              required
            />

            <label>Instructions:</label>
            <input
              type="text"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              required
            />

            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {formData.image && <img src={formData.image} alt="Preview" className="image-preview" />}

            <button type="submit">{formData.editMode ? 'Update Recipe' : 'Add Recipe'}</button>
          </form>
        </div>

        <div className="recipe-list">
          <h2>Recipe List</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={resetSearch}>Reset</button>
          <div className="recipe-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onDelete={() => deleteRecipe(recipe.id)}
                  onEdit={() => editRecipe(recipe.id)}
                />
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
        <Link to="/add-recipe">
          <button className="add-recipe-button">Add Recipe</button>
        </Link>
      </header>
    </div>
  );
};

export default Home;
