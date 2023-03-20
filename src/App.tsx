import { Pokeball } from "./Components/Pokeball";
import "./App.css";

// TO DO

// IDEES
// [] pagination du pokedex
// [] pouvoir utiliser le clavier

// FONCTIONNEL
// [] responsive mobile
// [] corriger index quand on charge des nouveaux pokemon ?
// [] ouverture progressive de la pokeball
// [] inclure filtrage par type de pokemon

// API LINK : "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"

export const App = () => {
  return (
    <div className="App">
      <Pokeball />
    </div>
  );
};
