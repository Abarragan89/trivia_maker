import './winnerPodium.css';
import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import winningMusicSound from '../../assets/sounds/winners-circle.wav';
import useSound from 'use-sound';

function WinnerPodium() {
    const [winningMusic, { stop }] = useSound(winningMusicSound, { volume: '.3' });

    // get game form players
    const gameInstance = useLocation().state;
    const allPlayers = gameInstance.players

    // use this to set the organized, grouped players for display
    const [playerPodium, setPlayerPodium] = useState(null);

    // function that is called on click to organize players. 
    function orderPlayerPodium(players) {
        winningMusic();
        let sortedPlayers = allPlayers.sort((a, b) => {
            return (a.score > b.score) ? 1 : -1
        })
        setPlayerPodium(organizeTiesIntoGroups(sortedPlayers))
    }
    // groups players with a tie score
    function organizeTiesIntoGroups(players) {
        // make the array of objects into an object of just  ordered [scores] and [names]
        let playerScores = []
        let playerNames = []
        players.forEach(player => {
            playerNames.push(player.name);
            playerScores.push(player.score)
        })
        // loop throught the playerScores array and group them into objects and push them into an array
        const positions = [];
        for (let i = 0; i < playerScores.length; i++) {
            let continueLooping = true;
            if (positions.length !== 0) {
                for (let j = 0; j < positions.length; j++) {
                    if (playerScores[i] === positions[j].score) {
                        positions[j].names.push(playerNames[i])
                        continueLooping = false
                        continue;
                    }
                }
            }
            if (continueLooping) {
                let place = {
                    score: playerScores[i],
                    names: [playerNames[i]]
                }
                positions.push(place)
            }
        }
        return positions;
    }


    return (
        <section id='winner-podium-container'>
            <h1>Game Results</h1>
            {!playerPodium && <button onClick={() => orderPlayerPodium(allPlayers)}>Show Results</button>}

            {playerPodium &&
                <>
                    <div id='podium' className='flex-box-col-sa' >
                        <Link onClick={() => stop()} id='exit-winner-circle' to='/'>Go Home</Link>
                        {playerPodium.map((rankings, Podiumindex) => (
                            <div id='ranking-section' key={Podiumindex}>
                                <div className='flex-box-se score-header'>
                                    <div className='flex-box-col-se'>
                                        <h3>{playerPodium.length - (playerPodium.length - (playerPodium.length - Podiumindex))}
                                            <span>{Podiumindex === playerPodium.length - 1 ? 'st' : Podiumindex === playerPodium.length - 2 ? 'nd' : Podiumindex === playerPodium.length - 3 ? 'rd' : 'th'}</span>
                                        </h3>
                                        <h5>Score: {rankings.score}</h5>

                                    </div>
                                    <div className='flex-box-se'>
                                        {rankings.names.map((name, index) => (
                                            <p key={index}>{name}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </>
            }
        </section>
    )
}

export default WinnerPodium;