import "../Styles/PokeballTop.css";

export const PokeballTop = (props) => {

    const { handleClick, className } = props;

    return (
        <div className={`PokeballTop ${className || ""}`}>
            <h1 >POKEDEX <br /> EXPLORER</h1>
            <div className="PokeballTop-stripe">
                <div className="PokeballTop-blackCircle">
                    <div className="PokeballTop-whiteCircle">
                        <button
                            className="PokeballTop-button"
                            onClick={handleClick}>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}