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
import EditGame from './Pages/EditPage/editPage.js';
import Login from './Components/Login/login.js';
import ConfirmUser from './Pages/ConfirmUser/confirmUser.js';
import ViewPublicGame from './Pages/ViewPublicGame/viewPublicGame.js';
import ForgotPassword from './Pages/ForgotPassword/forgotPassword.js';
import WinnerPodium from './Components/WinnerPodium/winnerPodium.js';
import Contact from './Pages/Contact/contact.js';
import StudentLogin from './Pages/StudentLogin/studentLogin.js';
import StudentDashboard from './Pages/StudentDashboard/studentDashboard.js';
import StudentStudy from './Pages/StudentStudy/studentStudy.js';
import About from './Pages/About/about.js';
import { Helmet } from 'react-helmet';

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
        <Helmet>
          <title>Who Nose That</title>
          <meta name='title' content='Who Nose That' />
          <meta name='description' content='Generate your own gameboard to play with your students or friends' />
          <meta property='og:title' content='Who Nose That' />
          <meta property='og:description' content='Generate your own gameboard to play with your students or friends' />
          <meta property='og:url' content='https://who-nose-that.com' />
          <meta name='keywords' content='who nose that, education, game, students, games, review games, jeopardy, classroom, classroom games' />
          <meta name='robots' content='index, follow' />
          <link rel='canonical' href='https://who-nose-that.com' />
        </Helmet>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/create-game' element={<CreateGame />}></Route>
          <Route path='/gamepage/:gameId' element={<GamePage />}></Route>
          <Route path='/view-game/:gameId' element={<ViewPublicGame />}></Route>
          <Route path='/my-games' element={<MyGames />}></Route>
          <Route path='/players/:gameId' element={<PlayerInput />}></Route>
          <Route path='/edit/:gameId' element={<EditGame />}></Route>
          <Route path='/register-user/:id' element={<ConfirmUser />}></Route>
          <Route path='/password-reset/:userId' element={<ForgotPassword />}></Route>
          <Route path='/winner-podium/:gameId' element={<WinnerPodium />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/student-login' element={<StudentLogin />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path="/student-dashboard/:teacher" element={<StudentDashboard />}></Route>
          <Route path="/student-study/:teacher/:gameId" element={<StudentStudy />}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
