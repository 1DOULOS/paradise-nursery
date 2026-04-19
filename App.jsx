import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

function LandingPage({ onNavigate }) {
  return (
    <div className="landing-page">
      <div className="landing-hero">
        <div className="landing-overlay" />
        <div className="landing-content">
          <div className="landing-eyebrow">🌿 Welcome to paradise</div>
          <h1 className="landing-title">
            Bring Nature <em>Home</em>
          </h1>
          <div className="company-name">Paradise Nursery</div>
          <p className="landing-desc">
            Paradise Nursery is your sanctuary for premium houseplants. From lush tropicals to
            architectural statement pieces, we hand-select every plant to ensure it arrives
            vibrant and ready to thrive. Transform your living space into a living garden.
          </p>
          <button className="btn-get-started" onClick={() => onNavigate('products')}>
            Get Started →
          </button>
        </div>
      </div>
      <AboutUs />
    </div>
  );
}

function App() {
  const [page, setPage] = useState('landing');

  return (
    <Provider store={store}>
      {page === 'landing' && <LandingPage onNavigate={setPage} />}
      {page === 'products' && <ProductList onNavigate={setPage} />}
      {page === 'cart' && <CartItem onNavigate={setPage} />}
    </Provider>
  );
}

export default App;
