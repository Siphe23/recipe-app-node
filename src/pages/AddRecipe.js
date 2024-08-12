import React, { useState } from 'react';
import logo from '../imge/logo.png'; 
import '../pages/AddRecipe.css';

const RecipeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    image: '',
  });

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
    console.log('Submitting recipe:', formData); 

    if (typeof onSubmit === 'function') {
      onSubmit(formData);
      setFormData({
        name: '',
        ingredients: '',
        instructions: '',
        image: '',
      });
    } else {
      console.error('onSubmit is not a function');
    }
  };

  return (
    <div className="recipe-form-container">
      <img src={logo} className="App-logo" alt="logo" />
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

        <label>Ingredients:</label>
        <input type="text" name="ingredients" value={formData.ingredients} onChange={handleInputChange} required />

        <label>Instructions:</label>
        <input type="text" name="instructions" value={formData.instructions} onChange={handleInputChange} required />

        <label>Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />

        {formData.image && <img src={formData.image} alt="Preview" className="image-preview" />}

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
