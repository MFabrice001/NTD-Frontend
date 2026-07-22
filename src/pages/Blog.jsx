import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blogs from our new Spring Boot public API
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/blogs`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setError('Failed to load perspectives. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="blog-hero-content">
          <h1>Our Perspectives</h1>
          <p>Insights, news, and industry trends from the ND Build & Design team.</p>
        </div>
      </div>

      <div className="section">
        {loading && <div className="loading-state">Loading perspectives...</div>}
        
        {error && <div className="error-state">{error}</div>}

        {!loading && !error && blogs.length === 0 && (
          <div className="empty-state">
            <h2>No perspectives published yet</h2>
            <p>Check back later for news and updates!</p>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="blog-grid">
            {blogs.map(blog => (
              <div className="blog-card" key={blog.id}>
                {blog.imageUrl && (
                  <div className="blog-card-img" style={{ backgroundImage: `url(${blog.imageUrl})` }}></div>
                )}
                <div className="blog-card-content">
                  <span className="blog-date">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <h3>{blog.title}</h3>
                  <p>{blog.content.substring(0, 100)}{blog.content.length > 100 ? '...' : ''}</p>
                  {blog.author && <span className="blog-author">By {blog.author}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
