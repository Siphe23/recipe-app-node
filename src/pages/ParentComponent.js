import React, { useCallback } from 'react';
import RecipeForm from './RecipeForm';

const ParentComponent = () => {
  const handleSubmit = useCallback((recipe) => {
    console.log('Recipe submitted:', recipe);
    // Handle form submission logic (e.g., updating state, making an API call)
  }, []);

  return <RecipeForm onSubmit={handleSubmit} />;
};

export default ParentComponent;
