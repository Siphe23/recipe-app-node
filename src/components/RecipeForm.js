import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios here
import '../styles/AddRecipe.css';

const RecipeForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    ingredients: initialData.ingredients ? initialData.ingredients.join(', ') : '',
    instructions: initialData.instructions || '',
    picture: initialData.image || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.ingredients || !formData.instructions) {
      setError('All fields are required.');
      return;
    }

    setError('');
    setLoading(true);

    const ingredientsArray = formData.ingredients.split(',').map((ingredient) => ingredient.trim());

    const dataToSubmit = {
      name: formData.name,
      ingredients: ingredientsArray,
      instructions: formData.instructions,
      image: formData.picture,
    };

    try {
      if (isEdit) {
        // Update an existing recipe
        const response = await axios.patch(
          `http://localhost:3000/api/v1/recipes/${initialData.id}`, // Adjust URL if needed
          dataToSubmit
        );
        onSubmit(response.data);
      } else {
        // Add a new recipe
        const response = await axios.post('http://localhost:3000/api/v1/recipes', dataToSubmit);
        onSubmit(response.data);
      }

      // Reset form fields
      setFormData({
        name: '',
        ingredients: '',
        instructions: '',
        picture: '',
      });
    } catch (err) {
      console.error('Error submitting recipe:', err);
      setError('Error submitting the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
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
