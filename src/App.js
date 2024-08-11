import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import UpdateRecipeForm from './pages/UpdateRecipeForm'; 
import LoginRegister from './pages/LoginRegister';
import { AuthProvider } from './pages/AuthProvider';
import ProtectedRoute from './pages/ProtectedRoute';
import Navbar from './components/Navbar'; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar /> {/* Add Navbar here if needed */}
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
          <Route path="/update-recipe/:id" element={<ProtectedRoute><UpdateRecipeForm /></ProtectedRoute>} />
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


