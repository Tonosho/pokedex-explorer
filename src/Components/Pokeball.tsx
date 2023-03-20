import { useState, useEffect, Fragment } from "react";
import { PokeballBottom } from "./PokeballBottom";
import { TypeSelector } from "./TypeSelector";
import { PokemonRow } from "./PokemonRow";
import { PokemonModal } from "./PokemonModal";
import { Pokemon } from "../Types/globals";
import { PokeballTop } from "./PokeballTop";
import "../Styles/Pokeball.css";


export const Pokeball = () => {

    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [showPokedex, setShowPokedex] = useState(false);
    const [currentFilter, setCurrentFilter] = useState('all');
    const [modalData, setModalData] = useState<Pokemon>();
    const [showModal, setShowModal] = useState(false);
    const [displayedPokemon, setDisplayedPokemon] = useState<any>();

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
    const showPokemon = (pokemon: Pokemon) => {
        setModalData(pokemon);
        setShowModal(!showModal);
    };

    // CHANGE TO PREVIOUS / NEXT POKEMON IN MODAL
    const changePokemon = (increment: number) => {
        if (!modalData) return;
        for (let pokemon of pokemonData) {
            if (pokemon.id === modalData.id + increment) {
                setModalData(pokemon)
            }
        }

    };

    // FILTER THE DISPLAYED POKEMON DEPENDING ON TYPE FILTER
    useEffect(() => {
        if (currentFilter === "all") {
            setDisplayedPokemon(pokemonData);
        } else {
            setDisplayedPokemon(pokemonData
                .filter(
                    pokemon => pokemon.types
                        .map(types => types.type.name)
                        .find(typeName => typeName === currentFilter)));
        };
    }, [currentFilter, pokemonData]);


    return <div className="Pokeball">
        <PokeballTop
            handleClick={() => setShowPokedex(!showPokedex)}
        />
        <div className={`Pokeball-pokedex ${showPokedex ? "m-show" : ""}`}>
            <TypeSelector
                type={(type: any) => setCurrentFilter(type)}
            />
            {displayedPokemon && displayedPokemon.map((pokemon: any, index: any) => (
                <Fragment key={pokemon.id}>
                    <PokemonRow
                        rowIndex={index}
                        pokemon={pokemon}
                        isClicked={(pokemon: Pokemon) => showPokemon(pokemon)} // Does : gives pokemon data to the modal  
                        isSelected={modalData && pokemon.name === modalData.name && showModal === true ? true : false}
                    />
                </Fragment>
            ))}
            <button
                className="Pokeball-loadMoreButton"
                onClick={() => setOffset(offset + 25)}
            >
                Load more ...
            </button>

        </div>
        <PokeballBottom />
        {showModal && (
            <PokemonModal
                pokemon={modalData}
                close={() => setShowModal(false)} // Does : take close function from child
                onChange={(increment: any) => changePokemon(increment)} // Does : take previous or next functions from child
                lastPokemon={pokemonData[pokemonData.length - 1].id} // Gives id of the last pokemon loaded in the Pokeball
            />
        )}
    </div>;
};