import './App.css';
import { PokemonRow } from './Components/PokemonRow'
import { PokemonModal } from './Components/PokemonModal';
import { useState, useEffect } from 'react';

// TO DO

// [] insérer deux cercles dans la pokeball
// [] corriger centrement éléments d'une row

// API LINK : "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"

const App = () => {

  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [modalData, setModalData] = useState();
  console.log("MODALDATA", modalData);
  const [showModal, setShowModal] = useState(false);

  // FETCH API
  useEffect(() => {
    const pokedexData = async () => {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`)
      const jsonResponse = await data.json()
      const pokemonList = jsonResponse.results; 

      for (let element of pokemonList) {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${element.name}`) // Does : fetch data for each pokemon
        const fetchedInfo = await data.json();
        setPokemonData((pokemonData) => [...pokemonData, fetchedInfo])
      }
    }
    pokedexData();
  }, [offset])

  return (
    <div className="App">
      {/* POKEBALL DOME */}
      <div className="App-pokeballDome"><h1>POKEDEX</h1></div>
      <div className="App-pokeballStripe"></div>
      {/* POKEMON ROWS */}
      <div className="App-pokedex">
        {pokemonData.map((pokemon, index) => (
          <div key={index}>

            <PokemonRow
              rowIndex={index}
              pokemonName={pokemon.name}
              pokemonImg={pokemon.sprites.front_default}
              infos={pokemon}
              isClicked={(name, infos) => {
                setModalData({ name, infos });
                setShowModal(!showModal)
              }} // Does : take pokemon stats from child; Goal : provide these stats to the modal
            />

          </div>
        ))}
      </div>

      <button className="App-loadMoreButton" onClick={() => setOffset(offset + 25)}>Load more</button>

      {showModal &&
        <PokemonModal
          name={modalData.name}
          infos={modalData.infos}
          clickToClose={() => setShowModal(false)} // Does : take close function from the child
        />
      }

    </div>
  );
}

export default App;
