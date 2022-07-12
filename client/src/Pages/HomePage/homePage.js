import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <section>
            <Link to="/create-game">New Game</Link>
        </section>
    )
}

export default HomePage;