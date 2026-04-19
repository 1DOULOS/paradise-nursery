import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from '../CartSlice';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping with Paradise Nursery 🌿');
  };

  return (
    <div className="cart-page">
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => onNavigate('landing')}>🌿 Paradise Nursery</div>
        <div className="navbar-links">
          <span className="nav-link" onClick={() => onNavigate('landing')}>Home</span>
          <span className="nav-link" onClick={() => onNavigate('products')}>Plants</span>
          <span className="nav-link active cart-nav" onClick={() => onNavigate('cart')}>
            🛒 Cart
            <span className="cart-badge">{cartCount}</span>
          </span>
        </div>
      </nav>

      <div className="cart-content">
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
          <div className="cart-totals-bar">
            <span>Total Plants: <strong>{cartCount}</strong></span>
            <span>Total Cost: <strong>${cartTotal.toFixed(2)}</strong></span>
          </div>
        </div>

        <div className="cart-actions-top">
          <button className="btn-continue" onClick={() => onNavigate('products')}>
            ← Continue Shopping
          </button>
          <button className="btn-checkout" onClick={handleCheckout}>
            Checkout — ${cartTotal.toFixed(2)}
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Browse our plants and add something beautiful to your space.</p>
            <button className="btn-continue" onClick={() => onNavigate('products')}>
              Browse Plants
            </button>
          </div>
        ) : (
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-row">
                <img src={item.image} alt={item.name} className="cart-item-thumb" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-unit">Unit price: ${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-qty">
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >+</button>
                </div>
                <div className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeItem(item.id))}
                  title="Remove item"
                >✕</button>
              </div>
            ))}

            <div className="cart-total-row">
              <span>Order Total</span>
              <span className="total-amount">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
