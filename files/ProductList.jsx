import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartCount, selectCartItems } from '../CartSlice';

const plantData = [
  // Tropical Beauties
  {
    id: 1, name: 'Monstera Deliciosa', price: 34.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Monstera_deliciosa3.jpg/320px-Monstera_deliciosa3.jpg',
    category: 'Tropical Beauties',
  },
  {
    id: 2, name: 'Bird of Paradise', price: 49.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Strelitzia_reginae_MS_4272.jpg/320px-Strelitzia_reginae_MS_4272.jpg',
    category: 'Tropical Beauties',
  },
  {
    id: 3, name: 'Peace Lily', price: 22.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/320px-Spathiphyllum_cochlearispathum_RTBG.jpg',
    category: 'Tropical Beauties',
  },
  {
    id: 4, name: 'Anthurium', price: 28.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Anthurium_andraeanum.jpg/320px-Anthurium_andraeanum.jpg',
    category: 'Tropical Beauties',
  },
  {
    id: 5, name: 'Bromeliad', price: 19.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Guzmania_cultivar.jpg/320px-Guzmania_cultivar.jpg',
    category: 'Tropical Beauties',
  },
  {
    id: 6, name: 'Calathea Orbifolia', price: 31.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Calathea_orbifolia_2.jpg/320px-Calathea_orbifolia_2.jpg',
    category: 'Tropical Beauties',
  },
  // Easy Growers
  {
    id: 7, name: 'Snake Plant', price: 18.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/320px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg',
    category: 'Easy Growers',
  },
  {
    id: 8, name: 'Pothos', price: 12.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Epipremnum_aureum_31082012.jpg/320px-Epipremnum_aureum_31082012.jpg',
    category: 'Easy Growers',
  },
  {
    id: 9, name: 'ZZ Plant', price: 27.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/ZZ_plant.jpg/320px-ZZ_plant.jpg',
    category: 'Easy Growers',
  },
  {
    id: 10, name: 'Spider Plant', price: 11.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chlorophytum_comosum0.jpg/320px-Chlorophytum_comosum0.jpg',
    category: 'Easy Growers',
  },
  {
    id: 11, name: 'Chinese Evergreen', price: 21.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/20190408Aglaonema_commutatum.jpg/320px-20190408Aglaonema_commutatum.jpg',
    category: 'Easy Growers',
  },
  {
    id: 12, name: 'Aloe Vera', price: 14.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/320px-Aloe_vera_flower_inset.png',
    category: 'Easy Growers',
  },
  // Statement Plants
  {
    id: 13, name: 'Fiddle Leaf Fig', price: 64.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ficus_lyrata_2.jpg/320px-Ficus_lyrata_2.jpg',
    category: 'Statement Plants',
  },
  {
    id: 14, name: 'Rubber Tree', price: 38.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Ficus_elastica_in_Kannur.jpg/320px-Ficus_elastica_in_Kannur.jpg',
    category: 'Statement Plants',
  },
  {
    id: 15, name: 'Olive Tree', price: 74.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/24701-nature-natural-beauty.jpg/320px-24701-nature-natural-beauty.jpg',
    category: 'Statement Plants',
  },
  {
    id: 16, name: 'Dracaena Marginata', price: 42.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Dracaena_marginata1.jpg/320px-Dracaena_marginata1.jpg',
    category: 'Statement Plants',
  },
  {
    id: 17, name: 'Umbrella Plant', price: 33.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Schefflera_actinophylla_-_Kahului_Airport.jpg/320px-Schefflera_actinophylla_-_Kahului_Airport.jpg',
    category: 'Statement Plants',
  },
  {
    id: 18, name: 'Areca Palm', price: 55.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Dypsis_lutescens1.jpg/320px-Dypsis_lutescens1.jpg',
    category: 'Statement Plants',
  },
];

const CATEGORIES = ['Tropical Beauties', 'Easy Growers', 'Statement Plants'];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const [addedIds, setAddedIds] = useState([]);

  const isInCart = (id) => cartItems.some(item => item.id === id);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedIds(prev => [...prev, plant.id]);
  };

  return (
    <div className="product-list-page">
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => onNavigate('landing')}>🌿 Paradise Nursery</div>
        <div className="navbar-links">
          <span className="nav-link" onClick={() => onNavigate('landing')}>Home</span>
          <span className="nav-link active" onClick={() => onNavigate('products')}>Plants</span>
          <span className="nav-link cart-nav" onClick={() => onNavigate('cart')}>
            🛒 Cart
            <span className="cart-badge">{cartCount}</span>
          </span>
        </div>
      </nav>

      <div className="product-content">
        <div className="product-header">
          <h1>Our Plants</h1>
          <p>Hand-picked houseplants for every space and lifestyle</p>
        </div>

        {CATEGORIES.map(category => (
          <div key={category} className="category-section">
            <div className="category-tag">{category}</div>
            <div className="plants-grid">
              {plantData
                .filter(p => p.category === category)
                .map(plant => (
                  <div key={plant.id} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-thumbnail" />
                    <div className="plant-info">
                      <h3 className="plant-name">{plant.name}</h3>
                      <p className="plant-price">${plant.price.toFixed(2)}</p>
                      <button
                        className={`add-to-cart-btn ${isInCart(plant.id) ? 'added' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={isInCart(plant.id)}
                      >
                        {isInCart(plant.id) ? '✓ Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
