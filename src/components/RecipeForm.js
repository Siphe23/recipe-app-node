import React, { useState, useEffect } from 'react';
import '../pages/AddRecipe.css'; // Make sure to update the path if needed

const RecipeForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    ingredients: initialData.ingredients ? initialData.ingredients.join(', ') : '',
    instructions: initialData.instructions || '',
    picture: initialData.image || '', // Use 'image' if that’s how your backend expects it
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set form data when initialData changes (for editing)
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

    // Validation
    if (!formData.name || !formData.ingredients || !formData.instructions) {
      setError('All fields are required.');
      return;
    }

    setError(''); // Clear previous errors
    setLoading(true); // Set loading to true while submitting

    const ingredientsArray = formData.ingredients.split(',').map(ingredient => ingredient.trim());

    const dataToSubmit = {
      ...formData,
      ingredients: ingredientsArray,
      image: formData.picture, // Use 'image' as needed
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
        onSubmit(data); // Trigger the onSubmit prop to notify parent component
        // Reset form fields after successful submission
        setFormData({
          name: '',
          ingredients: '',
          instructions: '',
          picture: '',
        });
      })
      .catch((error) => {
        console.error('Error submitting recipe:', error);
        setError('Error submitting the recipe. Please try again.'); // Display error message
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
