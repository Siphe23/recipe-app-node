import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../imge/logo.png';
import '../pages/Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    image: '',
    editMode: false,
    editIndex: -1,
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/recipes')
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data); 
      })
      .catch((error) => console.error('Error fetching recipes:', error));
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
    const updatedRecipes = formData.editMode
      ? recipes.map((recipe, index) =>
          index === formData.editIndex ? formData : recipe
        )
      : [...recipes, formData];
      
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes); 

    setFormData({
      name: '',
      ingredients: '',
      instructions: '',
      image: '',
      editMode: false,
      editIndex: -1,
    });
  };

  const deleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes); 
  };

  const editRecipe = (index) => {
    const recipeToEdit = recipes[index];
    setFormData({
      ...recipeToEdit,
      editMode: true,
      editIndex: index,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredRecipes(recipes); 
    } else {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.instructions.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    setFilteredRecipes(recipes); 
  };

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
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label>Ingredients:</label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              required
            />

            <label>Instructions:</label>
            <input
              type="text"
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              required
            />

            <label>Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image && <img src={formData.image} alt="Recipe" className="image-preview" />}

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
          <ul>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <li key={index}>
                  <div>
                    <label className="label">Name:</label> {recipe.name}<br />
                    <label className="label">Ingredients:</label> {recipe.ingredients}<br />
                    <label className="label">Instructions:</label> {recipe.instructions}<br />
                    <img src={recipe.image} alt="Recipe" className="recipe-image" />
                  </div>
                  <button onClick={() => editRecipe(index)}>Edit</button>
                  <button onClick={() => deleteRecipe(index)}>Delete</button>
                </li>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </ul>
        </div>
        <Link to="/add-recipe">
          <button className="add-recipe-button">Add Recipe</button>
        </Link>
      </header>
    </div>
  );
};

export default Home;


