import "./App.css";
import { PokemonRow } from "./Components/PokemonRow";
import { PokemonModal } from "./Components/PokemonModal";
import { PokeballTop } from "./Components/PokeballTop";
import { PokeballBottom } from "./Components/PokeballBottom";
import { TypeSelector } from "./Components/TypeSelector";
import { useState, useEffect, Fragment } from "react";

// TO DO

// IDEES
// [] pagination du pokedex
// [] pouvoir utiliser le clavier

// FONCTIONNEL
// [] responsive mobile
// [] corriger index quand on charge des nouveaux pokemon ?
// [] ouverture progressive de la pokeball
// [] inclure filtrage par type de pokemon

// API LINK : "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"

export const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [showPokedex, setShowPokedex] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [modalData, setModalData] = useState();
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

  // SHOW CLICKED POKEMON IN MODAL
  const showPokemon = (pokemon) => {
    setModalData(pokemon);
    setShowModal(!showModal);
  };

  // CHANGE TO PREVIOUS / NEXT POKEMON IN MODAL
  const changePokemon = (increment) => {
    for (let pokemon of pokemonData) {
      if (pokemon.id === modalData.id + increment) {
        setModalData(pokemon)
      }
    }
  };

  // ARRAY OF POKEMON TO BE DISPLAYED IN POKEDEX BODY
  let displayedPokemon = [];

  // FILTER THE DISPLAYED POKEMON DEPENDING ON TYPE FILTER
  if (currentFilter === "all") {
    displayedPokemon = pokemonData;
  };

  if (currentFilter !== "all") {
    displayedPokemon = pokemonData
      .filter(
        pokemon => pokemon.types
          .map(types => types.type.name)
          .find(typeName => typeName === currentFilter));
  };

  return (
    <div className="App">

      <div className="App-pokeballTop">
        <PokeballTop
          handleClick={() => setShowPokedex(!showPokedex)}
        />
      </div>

      {showPokedex && (
        <div className="App-pokedex">

          <TypeSelector
            type={(type) => setCurrentFilter(type)}
          />

          {displayedPokemon.map((pokemon, index) => (
            <Fragment key={pokemon.id}>
              <PokemonRow
                rowIndex={index}
                pokemon={pokemon}
                isClicked={(name, infos) => { showPokemon(name, infos) }} // Does : gives pokemon data to the modal
                isSelected={pokemon.name === modalData.name && showModal === true ? true : false}
              />
            </Fragment>
          ))}

          <button
            className="App-loadMoreButton"
            onClick={() => setOffset(offset + 25)}
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
