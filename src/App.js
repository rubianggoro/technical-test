import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import PokemonList from "./Pages/PokemonList";
import PokemonDetail from "./Pages/PokemonDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PokemonList/>}/>
        <Route exact path="/:id" element={<PokemonDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
