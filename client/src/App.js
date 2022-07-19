//////////// ROUTER ///////////////////
import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from 'react-router-dom';

/////////// COMPONENTS ////////////////
import GamePage from './Pages/GamePage/gamePage.js'; 
import HomePage from './Pages/HomePage/homePage.js';
import CreateGame from './Pages/CreateGame/createGame.js';
import MyGames from './Pages/MyGames/myGames.js';
import PlayerInput from './Pages/PlayerInput/playerInput.js';

// import Apollo Client package for context
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Set up Apollo link 
const httpLink = createHttpLink({
  uri: '/graphql/',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
client.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
};

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/create-game' element={<CreateGame />}></Route>
          <Route path='/gamepage/:gameId' element={<GamePage />}></Route>
          <Route path='/my-games' element={<MyGames />}></Route>
          <Route path='/players/:gameId' element={<PlayerInput />}></Route>

        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
