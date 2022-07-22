function WinnerPodium({ endGameData }) {
    console.log('winnerPodium', endGameData)
    return (
        <section>
            <p>Winner Cirle</p>
            <p>{endGameData.winner}</p>
        </section>
    )
}

export default WinnerPodium;