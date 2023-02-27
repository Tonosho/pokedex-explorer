import "./PokemonRow.css";
import pokedexIcon from "../Images/pokedexIcon.png";

export const PokemonRow = (props) => {

  const { rowIndex, isClicked, pokemon } = props;

  const isEven = rowIndex % 2 === 0;

  return (
    <div className={`PokemonRow ${isEven ? "m-even" : ""}`}>
      <div className="PokemonRow-items">

        <img
          src={pokemon.sprites.front_default}
          alt={`Illustration of ${pokemon.name}`}
        />

        <h2>{pokemon.name}</h2>

        <button
          className={`PokemonRow-button ${isEven ? "m-even" : ""}`}
          onClick={() => { isClicked(pokemon) }} // Does : Bring pokemon datas to parent; Goal : show modal with these datas
        >
          <img
            src={pokedexIcon}
            alt="Pokedex icon"
            className="PokemonRow-icon"
          />
        </button>

      </div>
    </div>
  );
};
