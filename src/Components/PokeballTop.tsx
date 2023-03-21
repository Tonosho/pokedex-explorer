import "../Styles/PokeballTop.css";

interface PokeballTopProps {
    handleClick: () => void
};

export const PokeballTop = ({
    handleClick
}: PokeballTopProps) => {

    return (
        <div className={"PokeballTop"}>
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
    );
};