import '../Styles/TypeSelector.css';

export enum PokemonType {
    ALL = "all",
    FIRE = "fire",
    GRASS = "grass",
    WATER = "water",
    NORMAL = "normal",
    POISON = "poison",
    ELECTRIC = "electric",
}

interface TypeSelectorProps {
    onChange: (type: PokemonType) => void
}

export const TypeSelector = ({ onChange }: TypeSelectorProps) => {

    return (
        <div className="TypeSelector">
            <select
                onChange={(e) => {
                    const type = e.target.value as PokemonType;
                    onChange(type)
                }}
            >
                {Object.values(PokemonType).map(pokemonType =>
                    <option value={pokemonType}>{pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)}</option>
                )}
            </select>
        </div>
    )

}