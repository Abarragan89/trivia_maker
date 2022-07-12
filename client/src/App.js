//////////// ROUTER ///////////////////
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  BrowserRouter
} from 'react-router-dom';

/////////// COMPONENTS ////////////////
import GamePage from './Pages/GamePage/gamePage.js'; 
import HomePage from './Pages/HomePage/homePage.js';
import CreateGame from './Pages/CreateGame/createGame.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create-game" element={<CreateGame />}></Route>
        <Route path="/gamepage" element={<GamePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
