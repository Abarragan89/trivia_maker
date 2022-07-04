//////////// ROUTER ///////////////////
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  BrowserRouter
} from 'react-router-dom';

/////////// COMPONENTS ////////////////
import GamePage from './GamePage/gamePage.js' 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gamepage" element={<GamePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
