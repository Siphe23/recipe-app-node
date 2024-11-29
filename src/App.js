import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import LoginRegister from './pages/LoginRegister';
import ProtectedRoute from './pages/ProtectedRoute';
import RecipeForm from './components/RecipeForm'; // Import RecipeForm
import HomePage from './pages/Home';
import RecipeList from './components/RecipeList'; // Import RecipeList

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route for root path */}
          <Route path="/home" element={<HomePage />} /> {/* You can change this to LoginRegister if needed */}

          {/* Routes for login and register */}
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/recipes-form" element={<RecipeForm />} />
            <Route path="/recipe-list" element={<RecipeList />} />
        
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
