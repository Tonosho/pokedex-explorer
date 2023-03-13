import "./PokemonRow.css";
import pokedexIcon from "../Images/pokedexIcon.png";

export const PokemonRow = (props) => {

  const { rowIndex, isClicked, pokemon, isSelected } = props;

  const isEven = rowIndex % 2 === 0;

  return (
    <div className={`PokemonRow ${isEven ? "m-even" : ""} ${isSelected ? "m-selected" : ""}`}>
      <button
        className="PokemonRow-button"
        onClick={() => { isClicked(pokemon) }} // Does : Bring pokemon datas to parent; Goal : show modal with these datas
      >
        <div className="PokemonRow-items">

          <img
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
