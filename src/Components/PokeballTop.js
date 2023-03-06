import "./PokeballTop.css";

export const PokeballTop = (props) => {

    const { handleClick } = props;

    return (
        <div className="PokeballTop">
            <div className="PokeballTop-dome">
                <h1>POKEDEX</h1>
            </div >
            <div className="PokeballTop-stripe">
                <div className="PokeballTop-blackCircle">
                    <div className="PokeballTop-whiteCircle">
                        <button
                            className="PokeballTop-button"
                            onClick={() => handleClick()}>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}