import './gamePage.css'
import '../../Components/GameBoard/gameBoard'
import GameBoard from '../../Components/GameBoard/gameBoard';

function GamePage() {
    return (
        <main>
            <h1>The Columbian Exchange</h1>
            <section>
                <GameBoard />
            </section>
        </main>
    )
}

export default GamePage;