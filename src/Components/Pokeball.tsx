/* eslint-disable */
import { useState, useEffect, Fragment } from "react";
import { PokeballBottom } from "./PokeballBottom";
import { PokemonType, TypeSelector } from "./TypeSelector";
import { PokemonRow } from "./PokemonRow";
import { PokemonModal } from "./PokemonModal";
import { PokeballTop } from "./PokeballTop";
import { Pokemon } from "../Types/globals";
import "../Styles/Pokeball.css";

export const Pokeball = () => {

    const [pokemonsData, setPokemonsData] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [showPokedex, setShowPokedex] = useState<boolean>(false);
    const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>();
    const [currentFilter, setCurrentFilter] = useState<PokemonType>(PokemonType.ALL);
    const [modalData, setModalData] = useState<Pokemon>();


    useEffect(() => {
        // Get pokemon urls
        const pokemons: Pokemon[] = [];
        const pokedexData = async () => {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`);
            const jsonResponse = await data.json();
            const pokemonList = jsonResponse.results;

            // Fetch each pokemon url
            for (let pokemon of pokemonList) {
                const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Does : get first letter of name uppercased
                const data = await fetch(pokemon.url); // Does : fetch data for each pokemon
                const fetchedInfo = await data.json();
                const pokemonData = {
                    ...fetchedInfo,
                    name: capitalizedName,
                } as Pokemon; // Does : set a capitalized name in the pokemon object 
                pokemons.push(pokemonData)
            }
            return pokemons;
        };

        pokedexData().then(newData => newData && setPokemonsData([...pokemonsData].concat(newData)));

    }, [offset]);


    // FILTER THE DISPLAYED POKEMON DEPENDING ON TYPE FILTER
    useEffect(() => {
        if (currentFilter === PokemonType.ALL) {
            setDisplayedPokemon(pokemonsData);
        } else {
            setDisplayedPokemon(pokemonsData
                .filter(
                    pokemon => pokemon.types
                        .map(types => types.type.name)
                        .find(typeName => typeName === currentFilter)));
        };
    }, [currentFilter, pokemonsData]);


    // CHANGE TO PREVIOUS / NEXT POKEMON IN MODAL
    const changePokemon = (increment: number) => {
        if (!modalData) return;
        for (let pokemon of pokemonsData) {
            if (pokemon.id === modalData.id + increment) {
                setModalData(pokemon)
            }
        }
    };

    return <div className="Pokeball">
        <PokeballTop
            handleClick={() => setShowPokedex(!showPokedex)}
        />
        <div className={`Pokeball-pokedex ${showPokedex ? "m-show" : ""}`}>
            <TypeSelector
                onChange={(type: PokemonType) => setCurrentFilter(type)}
            />
            {displayedPokemon && displayedPokemon.map((pokemon: Pokemon, index: number) => (

                <PokemonRow
                    key={pokemon.id}
                    rowIndex={index}
                    pokemon={pokemon}
                    isClicked={(pokemon: Pokemon) => setModalData(pokemon)} // Does : brings the clicked pokemon to the modal  
                    isSelected={modalData && pokemon.name === modalData.name ? true : false}
                />

            ))}
            <button
                className="Pokeball-loadMoreButton"
                onClick={() => setOffset(offset + 25)}
            >
                Load more ...
            </button>

        </div>
        <PokeballBottom />
        {modalData && (
            <PokemonModal
                pokemon={modalData}
                close={() => setModalData(undefined)} // Does : take close function from child
                onChange={(increment: number) => changePokemon(increment)} // Does : take previous or next functions from child
                lastPokemon={pokemonsData[pokemonsData.length - 1].id} // Gives id of the last pokemon loaded in the Pokeball
            />
        )}
    </div>;
};