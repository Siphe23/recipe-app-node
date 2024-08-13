import React, { useState, useEffect } from 'react';
import './AddRecipe.css';

const RecipeForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    ingredients: initialData.ingredients ? initialData.ingredients.join(', ') : '',
    instructions: initialData.instructions || '',
    picture: initialData.image || '', // Use image if you keep it as is
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData({
      name: initialData.name || '',
      ingredients: initialData.ingredients ? initialData.ingredients.join(', ') : '',
      instructions: initialData.instructions || '',
      picture: initialData.image || '', // Use image if you keep it as is
    });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.ingredients || !formData.instructions) {
      setError('All fields are required.');
      return;
    }

    setError('');

    const ingredientsArray = formData.ingredients.split(',').map(ingredient => ingredient.trim());

    const dataToSubmit = {
      ...formData,
      ingredients: ingredientsArray,
      image: formData.picture, // Use image if you keep it as is
    };

    if (isEdit) {
      fetch(`http://localhost:3001/recipes/${initialData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      })
      .then(response => response.json())
      .then(data => onSubmit(data))
      .catch(error => console.error('Error updating recipe:', error));
    } else {
      fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      })
      .then(response => response.json())
      .then(data => onSubmit(data))
      .catch(error => console.error('Error adding recipe:', error));
    }

    setFormData({
      name: '',
      ingredients: '',
      instructions: '',
      picture: '',
    });
  };

  return (
    <div className="recipe-form-container">
      <h2>{isEdit ? 'Edit Recipe' : 'Add Recipe'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Recipe Name
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Recipe Name" />
          </label>
        </div>
        <div>
          <label>
            Ingredients (comma-separated)
            <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients" />
          </label>
        </div>
        <div>
          <label>
            Instructions
            <textarea name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Instructions" />
          </label>
        </div>
        <div>
          <label>
            Picture URL
            <input name="picture" value={formData.picture} onChange={handleChange} placeholder="Picture URL" />
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isEdit ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
};

export default RecipeForm;
   