import { Link } from 'react-router-dom';
import LoginPage from '../../Components/LoginPage/loginPage';

function HomePage() {
    return (
        <>
        <LoginPage />
        <section>
            <Link to="/create-game">New Game</Link>
        </section>
        
        </>
    )
}

export default HomePage;