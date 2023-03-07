import "./PokemonModal.css";

export const PokemonModal = (props) => {

  const { pokemon, close, onChange, lastPokemon } = props;

  return (
    <div className="PokemonModal-background">

      <div className="PokemonModal-window">

        <img
          className="PokemonModal-profile"
          src={pokemon.sprites.front_default}
          alt={`Front view of ${pokemon.name}`}
        />
        <h2>{pokemon.name}</h2>

        <div className="PokemonModal-mainInfos">
          <p>Order: {pokemon.order}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Height: {pokemon.height}</p>
        </div>

        <div className="PokemonModal-subInfos">
          <p>Stats</p>
          {pokemon.stats.map((skill, index) => (
            <p key={index}>
              {skill.stat.name}: {skill.base_stat}
            </p>
          ))}
        </div>

        <div className="PokemonModal-picsContainer">
          <img src={pokemon.sprites.front_shiny} alt={`Front view of shiny ${pokemon.name}`} />
          <img src={pokemon.sprites.back_shiny} alt={`Back view of shiny ${pokemon.name}`} />
          <img src={pokemon.sprites.front_default} alt={`Front view of ${pokemon.name}`} />
          <img src={pokemon.sprites.back_default} alt={`Back view of ${pokemon.name}`} />
        </div>

        <div className="PokemonModal-buttonsContainer">
          <div className="PokemonModal-onChangeButtons">
            <button
              onClick={() => onChange(-1)}
              className={`PokemonModal-button ${pokemon.id - 1 === 0 ? "m-disabled" : ""}`}
            >
              Previous
            </button>
            <button
              onClick={() => onChange(+1)}
              className={`PokemonModal-button ${pokemon.id + 1 > lastPokemon ? "m-disabled" : ""}`}
            >
              Next
            </button>
          </div>

          <button
            className="PokemonModal-button"
            onClick={() => close()}
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
};
