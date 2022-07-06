//////////// ROUTER ///////////////////
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  BrowserRouter
} from 'react-router-dom';

/////////// COMPONENTS ////////////////
import GamePage from './Pages/GamePage/gamePage.js' 
import Question from './Components/Question/question'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/gamepage' element={<GamePage />}></Route>
        <Route path='/question' element={<Question />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
