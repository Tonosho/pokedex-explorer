import { Pokeball } from "./Components/Pokeball";
import "./App.css";

// TO DO

// IDEES
// [] pagination du pokedex
// [] pouvoir utiliser le clavier

// FONCTIONNEL
// [] corriger index quand on charge des nouveaux pokemon ?
// [] transformer les filtres en boutons dans une modal

// DESIGN
// [] espacement v mobile
// [] couleurs
// [] afficher types sous fromes "d'étiquettes"

// API LINK : "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"

export const App = () => {
  return (
    <div className="App">
      <Pokeball />
    </div>
  );
};
