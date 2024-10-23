import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import PokemonSearchPage from './pages/PokemonSearchPage';
import PokemonGalleryPage from './pages/PokemonGalleryPage';
import './App.css';
import './fonts/fonts.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <nav>
          <Link to='/'>Search Pokémon</Link>
          <Link to="/gallery">Pokémon Gallery</Link>
        </nav>
        <Routes>
          <Route path='/' element={<PokemonSearchPage />} />
          <Route path='/gallery' element={<PokemonGalleryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
