import "./App.css";
import { PokemonRow } from "./Components/PokemonRow";
import { PokemonModal } from "./Components/PokemonModal";
import { PokeballTop } from "./Components/PokeballTop";
import { PokeballBottom } from "./Components/PokeballBottom";
import { useState, useEffect, Fragment } from "react";

// TO DO

// IDEES
// [] pagination du pokedex
// [x] pouvoir passer d'un pokemon à l'autre dans la modal
// [] pouvoir utiliser le clavier

// FONCTIONNEL
// [x] rendre row cliquable
// [] responsive mobile
// [x] griser les boutons next et previous quand la limite est atteinte
// [] corriger index quand on charge des nouveaux pokemon ?
// [] ouverture progressive de la pokeball
// [] inclure filtrage par type de pokemon

// API LINK : "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"

export const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentFilter, setCurrentFilter] = useState()
  const [modalData, setModalData] = useState();
  const [showPokedex, setShowPokedex] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // FETCH API
  useEffect(() => {
    // Get pokemon urls
    const pokedexData = async () => {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`);
      const jsonResponse = await data.json();
      const pokemonList = jsonResponse.results;

      // Fetch each pokemon url
      for (let pokemon of pokemonList) {
        const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Does : get first letter of name uppercased
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`); // Does : fetch data for each pokemon
        const fetchedInfo = await data.json();
        const newObject = {
          ...fetchedInfo,
          name: capitalizedName,
        };
        setPokemonData((pokemonData) => [...pokemonData, newObject]); // Does : add each pokemon to the state
      }
    };
    pokedexData();
  }, [offset]);

  const showPokemon = (pokemon) => {
    setModalData(pokemon);
    setShowModal(!showModal);
  };

  const changePokemon = (increment) => {
    for (let pokemon of pokemonData) {
      if (pokemon.id === modalData.id + increment) {
        setModalData(pokemon)
      }
    }
  }

  const typeFilter = (selectedType) => {
    setFilteredPokemon([])

    for (let pokemon of pokemonData) {
      let searchType = pokemon.types.map(e => e.type.name);
      if (searchType.find(type => type === selectedType)) {
        setFilteredPokemon(filteredPokemon => [...filteredPokemon, pokemon])
      } else if (selectedType === "none") {
        setFilteredPokemon([])
      }
    }
  }

  return (
    <div className="App">

      <div className="App-pokeballTop">
        <PokeballTop
          handleClick={() => setShowPokedex(!showPokedex)}
        />
      </div>

      {showPokedex && (
        <div className="App-pokedex">

          <select
            className="App-typeSelector"
            // value={e.target.value}
            onChange={(e) => {
              typeFilter(e.target.value);
              setCurrentFilter(e.target.value)
            }}
          >
            <option value="none">None</option>
            <option value="normal">Normal</option>
            <option value="grass">Grass</option>
            <option value="water">Water</option>
            <option value="fire">Fire</option>
          </select>

          {(filteredPokemon.length > 0 ? filteredPokemon : pokemonData).map((pokemon, index) => (
            <Fragment key={pokemon.id}>
              <PokemonRow
                rowIndex={index}
                pokemon={pokemon}
                isClicked={(name, infos) => { showPokemon(name, infos) }} // Does : gives pokemon data to the modal
              />
            </Fragment>
          ))}

          <button
            className="App-loadMoreButton"
            onClick={() => {
              setOffset(offset + 25);
              typeFilter(currentFilter);
            }}
          >
            Load more ...
          </button>

        </div>)}

      {showModal && (
        <PokemonModal
          pokemon={modalData}
          close={() => setShowModal(false)} // Does : take close function from child
          onChange={(increment) => changePokemon(increment)} // Does : take previous or next functions from child
          lastPokemon={pokemonData[pokemonData.length - 1].id} // Gives id of the last pokemon loaded in the app
        />
      )}

      <div className="App-pokeballBottom">
        <PokeballBottom />
      </div>

    </div>
  );
};
