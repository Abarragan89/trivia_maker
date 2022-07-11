import './gamePage.css'
import '../../Components/GameBoard/gameBoard'
import GameBoard from '../../Components/GameBoard/gameBoard';
import { useRef } from 'react'

function GamePage() {
    const h1Text = useRef(null)

    return (
        <main>
            <h1 ref={h1Text}>The Columbian Exchange</h1>
            <section>
                <GameBoard h1ref={h1Text} />
            </section>
        </main>
    )
}

export default GamePage;