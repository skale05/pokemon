import "./Navbar.css";
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

function HeaderNavbar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <header>
        <nav className="HeaderNavBar">
          <Link to="/">
            <img src="https://clipground.com/images/pokemon-logo-png-5.png" width={200} alt="Pokemon Logo" />
          </Link>
          <div>
            <label className="searchBarLabel">Search for your Pokemon:</label>
            <input className="searchBar" value={searchValue} onChange={handleSearchInputChange} />
            <Link to={`/PokemonDetails/${searchValue}`}>
              <button className="searchButton">Search</button>
            </Link>
          </div>

          <ul>
            <li>
              <Link to="/" className="NavLinks">Explore our Pokemons</Link>
            </li>
            <li>
              <Link to="/BattleGame" className="NavLinks">Let's play BattleGame</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default HeaderNavbar;
