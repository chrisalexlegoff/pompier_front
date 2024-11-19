'use client';
import Navbar from './components/Navbar';
import './styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { useEffect } from 'react';
import { setAuth } from '../redux/authSlice';
import { setTheme } from '../redux/themeSlice';

export default function RootLayout({ children }) {
  // Initialiser l'état du thème et de l'authentification à partir du localStorage
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    store.dispatch(setAuth(!!token));

    const savedTheme = localStorage.getItem('darkMode') === 'true';
    store.dispatch(setTheme(savedTheme));

    if (savedTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <html lang="fr">
      <head>
        <title>Pompier App</title>
      </head>
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <Provider store={store}>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
