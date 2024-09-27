import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importar o arquivo CSS específico

function Header() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="header">
      <h1>Reserva de Hotéis</h1>
      <nav>
        <Link to="/">Principal</Link>
        <Link to="/add-hotel">Adicionar Hotel</Link>
        <Link to="/favorites">Favoritos</Link>
      </nav>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? 'Mudar para Tema Escuro' : 'Mudar para Tema Claro'}
      </button>
    </header>
  );
}

export default Header;