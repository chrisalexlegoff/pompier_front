'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-black dark:text-white font-bold text-xl">
          <Link href="/">Pompier</Link>
        </div>

        {/* Links and Theme Toggle for larger screens */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300" href="/register">
            Register
          </Link>
          <Link className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300" href="/login">
            Login
          </Link>
          {/* Toggle Dark Mode */}
          <button onClick={toggleTheme} className="text-black dark:text-white focus:outline-none ml-4">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="w-5 h-5" />
          </button>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black dark:text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link className="block text-black dark:text-white bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600" href="/register">
            Register
          </Link>
          <Link className="block text-black dark:text-white bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600" href="/login">
            Login
          </Link>
          {/* Toggle Dark Mode in Mobile */}
          <button onClick={toggleTheme} className="block text-black dark:text-white bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="w-5 h-5" />
          </button>
        </div>
      )}
    </nav>
  );
}
