import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import AuthProvider from './components/auth/AuthContext';
import WishlistProvider from './components/auth/WishlistContext';
import CartProvider from './components/auth/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
  <WishlistProvider>
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
  </WishlistProvider>
  </CartProvider>
);