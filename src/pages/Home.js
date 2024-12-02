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

  // Fetch recipes from the MongoDB server
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken'); // Assume the token is stored in localStorage
      try {
        const response = await fetch('http://localhost:5000/api/recipes', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          console.error('Unauthorized access. Please check your token.');
        }

        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data); // Also set filteredRecipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch recipes');
      }
      setLoading(false);
    };

    fetchRecipes();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      name: formData.name,
      ingredients: formData.ingredients.split(',').map((item) => item.trim()),
      instructions: formData.instructions,
      image: formData.image,
    };

    try {
      if (formData.editMode) {
        // Update an existing recipe
        const response = await fetch(`http://localhost:5000/api/recipes/${formData.editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeData),
        });
        const updatedRecipe = await response.json();
        const updatedRecipes = recipes.map((recipe) =>
          recipe._id === formData.editId ? updatedRecipe : recipe
        );
        setRecipes(updatedRecipes);
        setFilteredRecipes(updatedRecipes);
      } else {
        // Add a new recipe
        const response = await fetch('http://localhost:5000/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeData),
        });
        const newRecipe = await response.json();
        setRecipes([...recipes, newRecipe]);
        setFilteredRecipes([...recipes, newRecipe]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: 'DELETE',
      });
      const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const editRecipe = (id) => {
    const recipeToEdit = recipes.find((recipe) => recipe._id === id);
    setFormData({
      ...recipeToEdit,
      ingredients: recipeToEdit.ingredients.join(', '),
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="home-container">
      <header className="App-header">
        <div className="recipe-form">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{formData.editMode ? 'Edit Recipe' : 'Add Recipe'}</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            <label>Ingredients (comma-separated):</label>
            <input type="text" name="ingredients" value={formData.ingredients} onChange={handleInputChange} required />
            <label>Instructions:</label>
            <input type="text" name="instructions" value={formData.instructions} onChange={handleInputChange} required />
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {formData.image && <img src={formData.image} alt="Preview" className="image-preview" />}
            <button type="submit">{formData.editMode ? 'Update Recipe' : 'Add Recipe'}</button>
          </form>
        </div>

        <div className="recipe-list">
          <h2>Recipe List</h2>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
          <button onClick={handleSearch}>Search</button>
          <button onClick={resetSearch}>Reset</button>
          <div className="recipe-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} onDelete={() => deleteRecipe(recipe._id)} onEdit={() => editRecipe(recipe._id)} />
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
        <Link to="/add-recipe">
          <button className="add-recipe-button">Add New Recipe</button>
        </Link>
      </header>
    </div>
  );
};

export default Home;
