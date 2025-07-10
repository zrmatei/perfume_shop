import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import AuthProvider from './components/auth/AuthContext';
import WishlistProvider from './components/auth/WishlistContext';
import CartProvider from './components/auth/CartContext';
import ChatbotProvider from './components/auth/ChatbotContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
  <WishlistProvider>
  <ChatbotProvider>
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
  </ChatbotProvider>
  </WishlistProvider>
  </CartProvider>
);