// BlogCreate.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // For programmatic navigation
import API_BASE_URL from './config'; // Import the API base URL

function BlogCreate() {
  const history = useHistory();
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to create a new blog
    fetch(`${API_BASE_URL}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        // Redirect to the blog list page after creating a new blog
        history.push('/');
      })
      .catch((error) => {
        console.error('Error creating blog:', error);
      });
  };

  return (
    <div>
      <h1>Create a New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default BlogCreate;
