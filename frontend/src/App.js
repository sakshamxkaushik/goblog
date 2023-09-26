import React from 'react';
import { Route, Routes } from 'react-router-dom';

import BlogList from './components/BlogList'; // Import the components as needed
import BlogDetail from './components/BlogDetail'; // Import the components as needed
import BlogCreate from './components/BlogCreate'; // Import the components as needed

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
  <Route path="/" element={<BlogList />} />
  <Route path="/blogs/:id" element={<BlogDetail />} />
  <Route path="/create" element={<BlogCreate />} />
</Routes>
      </div>
    </Router>
  );
}

export default App;
