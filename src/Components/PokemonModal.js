import './PokemonModal.css';

export const PokemonModal = (props) => {

    const { name, infos, clickToClose } = props;

    const pokemonSkills = infos.stats; // Does : extracts the skills array from the api
    const pokemonPictures = infos.sprites; // Does : extracts the pictures object from the api

    return (
        <div
            className="PokemonModal-background"
            onClick={() => clickToClose()} // Does : Bring close function to parent
        >
            <div className="PokemonModal-window">

                <img className="PokemonModal-profile" src={infos.sprites.front_default} alt="front shiny" />
                <h2>{name}</h2>

                <div className="PokemonModal-mainInfos">
                    <p>Order: {infos.order} </p>
                    <p>Weight: {infos.weight}</p>
                    <p>Height: {infos.height}</p>
                    <p>Stats</p>
                </div>

                <div className="PokemonModal-subInfos">
                    {pokemonSkills.map((skill, index) => (
                        <p key={index}>{skill.stat.name}: {skill.base_stat}</p>
                    ))}
                </div>

                <div className="PokemonModal-picsContainer">
                    <img src={pokemonPictures.front_shiny} alt="front shiny" />
                    <img src={pokemonPictures.back_shiny} alt="front shiny" />
                    <img src={pokemonPictures.front_default} alt="front shiny" />
                    <img src={pokemonPictures.back_default} alt="front shiny" />
                </div>
            </div>
        </div>
    )

};

