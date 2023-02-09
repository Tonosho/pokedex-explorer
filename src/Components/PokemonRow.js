import './PokemonRow.css';
import pokedexIcon from '../Images/pokedexIcon.png';

export const PokemonRow = (props) => {

    const { rowIndex, pokemonName, pokemonImg, isClicked, infos } = props;

    const name = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1); // Does : get name first letter uppercased

    return (
        <div className={(rowIndex % 2) === 0 ? "PokemonRow-even" : "PokemonRow-odd"} > 

            <div className="PokemonRow-items">
                <img
                    src={pokemonImg}
                    alt="Pokemon illustration" />
                <div>{name}</div>
                <img
                    src={pokedexIcon}
                    alt="pokedex-icon"
                    className="PokemonRow-icon"
                    onClick={() => { isClicked(name, infos) }} // Does : Bring pokemon datas to parent; Goal : show modal with these datas
                />
            </div>

        </div>

    )
}