import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const Footer = () => {
  return (
    <Layout.Footer className="footer bg-dark" style={{ textAlign: 'center', color:'white' }}>
      <ul className="list-inline mb-3">
        <li className="list-inline-item">
          <Link to="/">Home</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/about">About</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <p className="text-muted">Pratik Goti &copy; {new Date().getFullYear()}</p>
    </Layout.Footer>
  );
};

export default Footer;
