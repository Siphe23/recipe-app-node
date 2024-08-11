
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/add-recipe">Add Recipe</Link></li>
        <li><Link to="/">Login/Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;



