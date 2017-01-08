import React from 'react';
import { Link } from 'react-router';

const sessionLinks = (logout) => (
  <div>
    <Link to='/signup' onClick={logout}>Signup</Link>
    {' or '}
    <Link to='/login' onClick={logout}>Login!</Link>
  </div>
);

const personalGreeting = (currentUser, logout) => (
  <div>
    <h1>Welcome {currentUser.username}!</h1>
    <button onClick={logout}>Logout</button>
  </div>
);

const Greeting = ({ currentUser, logout }) => (
  currentUser ? personalGreeting(currentUser, logout) : sessionLinks(logout)
);

export default Greeting;
