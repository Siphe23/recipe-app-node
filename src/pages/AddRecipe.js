import React, { useState, useEffect } from 'react';
import '../styles/AddRecipe.css';

const RecipeForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    ingredients: initialData.ingredients ? initialData.ingredients.join(', ') : '',
    instructions: initialData.instructions || '',
    picture: initialData.image || '', // Keep using 'image' if the backend expects 'image'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      name: initialData.name || '',
      ingredients: initialData.ingredients ? initialData.ingredients.join(', ') : '',
      instructions: initialData.instructions || '',
      picture: initialData.image || '',
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
    setLoading(true); // Set loading to true while submitting

    const ingredientsArray = formData.ingredients.split(',').map(ingredient => ingredient.trim());

    const dataToSubmit = {
      ...formData,
      ingredients: ingredientsArray,
      image: formData.picture, // Keep using 'image' if that's how your backend expects the field
    };

    const requestOptions = {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSubmit),
    };

    const url = isEdit
      ? `http://localhost:3001/recipes/${initialData.id}`
      : 'http://localhost:3001/recipes';

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        onSubmit(data);
        setFormData({
          name: '',
          ingredients: '',
          instructions: '',
          picture: '',
        });
      })
      .catch((error) => {
        console.error('Error submitting recipe:', error);
      })
      .finally(() => {
        setLoading(false); // Stop loading after submission
      });
  };

  return (
    <div className="recipe-form-container">
      <h2>{isEdit ? 'Edit Recipe' : 'Add Recipe'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Recipe Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Recipe Name"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Ingredients (comma-separated)
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Ingredients"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Instructions
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Instructions"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Picture URL
            <input
              name="picture"
              value={formData.picture}
              onChange={handleChange}
              placeholder="Picture URL"
            />
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : isEdit ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
