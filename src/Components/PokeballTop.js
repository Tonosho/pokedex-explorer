import "./PokeballTop.css";

export const PokeballTop = (props) => {

    const { onClickParent } = props;

    return (
        <div className="PokeballTop">
            <div className="PokeballTop-dome">
                <h1>POKEDEX</h1>
            </div >
            <div className="PokeballTop-stripe">
                <div className="PokeballTop-blackCircle">
                    {/* <div className="PokeballTop-whiteCircle"></div> */}
                    <button
                        className="PokeballTop-whiteCircle"
                        onClick={() => onClickParent()}>
                    </button>
                </div>
            </div>
        </div>
    )
}