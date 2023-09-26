// BlogDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For retrieving the blog ID from the URL
import API_BASE_URL from './config'; // Import the API base URL

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch the details of the specific blog using the blog ID from the URL
    fetch(`${API_BASE_URL}/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBlog(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}

export default BlogDetail;
