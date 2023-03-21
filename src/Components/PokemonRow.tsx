import "../Styles/PokemonRow.css";
import pokedexIcon from "../Images/pokedexIcon.png";
import { Pokemon } from "../Types/globals";

interface pokemonRowProps {
  rowIndex: number,
  pokemon: Pokemon,
  isClicked: (pokemon: Pokemon) => void,
  isSelected: boolean
};

export const PokemonRow = ({
  rowIndex,
  pokemon,
  isClicked,
  isSelected
}: pokemonRowProps) => {

  const isEven = rowIndex % 2 === 0;

  return (
    <div className={`PokemonRow ${isEven ? "m-even" : ""} ${isSelected ? "m-selected" : ""}`}>
      <button
        className="PokemonRow-button"
        onClick={() => isClicked(pokemon)} // Does : Bring pokemon datas to parent; Goal : show modal with these datas
      >
        <div className="PokemonRow-items">

          <img
            className="PokemonRow-illustration"
            src={pokemon.sprites.front_default}
            alt={`Illustration of ${pokemon.name}`}
          />

          <h2>{pokemon.name}</h2>

          <img
            src={pokedexIcon}
            alt="Pokedex icon"
            className="PokemonRow-icon"
          />

        </div>
      </button >

    </div >
  );
};
