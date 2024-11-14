import Navbar from './components/Navbar';
import './styles/globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>Pompier App</title>
      </head>
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
