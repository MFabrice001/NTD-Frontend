import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

const Blog = () => <div className="page-container"><h1 className="page-title">Blog</h1><p>Coming soon...</p></div>;
const Contact = () => <div className="page-container"><h1 className="page-title">Contact Us</h1><p>Coming soon...</p></div>;

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
