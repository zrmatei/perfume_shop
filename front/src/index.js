import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import AuthProvider from './components/context/AuthContext';
import WishlistProvider from './components/context/WishlistContext';
import CartProvider from './components/context/CartContext';
import ChatbotProvider from './components/context/ChatbotContext';

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