import "./App.css";
import { PokemonRow } from "./Components/PokemonRow";
import { PokemonModal } from "./Components/PokemonModal";
import { PokeballTop } from "./Components/PokeballTop";
import { useState, useEffect, Fragment } from "react";
import { PokeballBottom } from "./Components/PokeballBottom";

// TO DO

// [] insérer deux cercles dans la pokeball
// [] corriger centrement éléments d'une row
// [] rendre la row cliquable au lieu du bouton 
// [] responsive mobile
// [] changer typo

// API LINK : "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"

export const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
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

  const handleClick = (pokemon) => {
    setModalData(pokemon);
    setShowModal(!showModal);
  };

  return (
    <div className="App">

      <div className="App-pokeballTop">
        <PokeballTop
          onClickParent={() => setShowPokedex(!showPokedex)} />
      </div>

      {showPokedex && (
        <div className="App-pokedex">
          {pokemonData.map((pokemon, index) => (
            <Fragment key={pokemon.id}>
              <PokemonRow
                rowIndex={index}
                pokemon={pokemon}
                isClicked={(name, infos) => { handleClick(name, infos) }} // Does : gives pokemon data to the modal
              />
            </Fragment>
          ))}

          <button
            className="App-loadMoreButton"
            onClick={() => setOffset(offset + 25)}
          >
            Load more
          </button>

        </div>)}

      {showModal && (
        <PokemonModal
          pokemon={modalData}
          close={() => setShowModal(false)} // Does : take close function from the child
        />
      )}

      <div className="App-pokeballBottom">
        <PokeballBottom />
      </div>

    </div>
  );
};
