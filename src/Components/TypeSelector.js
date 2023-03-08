import './TypeSelector.css'; 

export const TypeSelector = (props) => {

    const { type } = props;

    return (
        <div className="TypeSelector">
            <select
                // value={e.target.value}
                onChange={(e) => type(e.target.value)}
            >
                <option value="all">All</option>
                <option value="normal">Normal</option>
                <option value="grass">Grass</option>
                <option value="water">Water</option>
                <option value="fire">Fire</option>
                <option value="poison">Poison</option>
            </select>
        </div>
    )

}