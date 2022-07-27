import './landingPage.css';

function LandingPage() {
    return(
        <main id='landing-page-main'>
            <section className='flex-box-sb landing-page-section'>
                <div className='landing-page-txt-div'>
                    <h2>Who Nose That?!</h2>
                    <p>Create your own trivia game board! Great for the classroom or just having fun at home. Make as many or as little questions as you like and save the gameboard to your library!</p>
                </div>
                <figure>
                <img className='landing-page-pic' src={require('../../assets/photos/gameboard.png')} alt=''/>
                </figure>
            </section>
            <section className='flex-box-sb landing-page-section' id='middle-section'>
            <figure>
                <img className='landing-page-pic' src={require('../../assets/photos/bonusRound.png')} alt=''/>
                </figure>
                <div className='landing-page-txt-div' id='landing-page-middle-section'>
                    <h2>Bonus Round!</h2>
                    <p>Get a question correct and move on to the Bonus Round! try to stop the ball over a multiplier to add to your score.</p>
                </div>
            </section>
            <section className='flex-box-sb landing-page-section'>
                <div className='landing-page-txt-div'>
                    <h2>Search, Edit, Save.</h2>
                    <p>Search public games from other uses. View, edit, and save them to your own library!</p>
                </div>
                <figure>
                <img className='landing-page-pic' src={require('../../assets/photos/publicGames.png')} alt=''/>
                </figure>
            </section>
        </main>
    )
}

export default LandingPage;