// BlogList.js
import React, { useState, useEffect } from 'react';
import API_BASE_URL from './config'; // Import the API base URL

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch the list of blogs from the backend when the component mounts
    fetch(`${API_BASE_URL}/blog`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a href={`/blog/${blog.id}`}>{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
