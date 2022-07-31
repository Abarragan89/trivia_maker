import './landingPage.css';
import Footer from '../../Components/Footer/footer';

function LandingPage() {
    return(
        <>
        <main id='landing-page-main'>
            <section className='flex-box-sb landing-page-section'>
                <div className='landing-page-txt-div'>
                    <h2>Who Nose That?!</h2>
                    <p>Create your own trivia game board! Great for the classroom or just having fun at home. Make as many or as little questions as you like and save the gameboard to your library!</p>
                </div>
                <figure>
                <img className='landing-page-pic' src={require('../../assets/photos/gameboard.png')} alt='gameboard during gameplay'/>
                </figure>
            </section>

            <section className='flex-box-sb landing-page-section' id='middle-section'>
            <figure>
                <img className='landing-page-pic' src={require('../../assets/photos/bonusRound.png')} alt='bonus round where user has to stop a bouncing ball on top designated areas'/>
                </figure>
                <div className='landing-page-txt-div' id='landing-page-middle-section'>
                    <h2>Bonus Round!</h2>
                    <p>Get a question correct and move on to the Bonus Round! try to stop the ball over a multiplier to add to your score.</p>
                </div>
            </section>

            <section className='flex-box-sb landing-page-section'>
                <div className='landing-page-txt-div'>
                    <h2>Random Runner-Up</h2>
                    <p>Once the current player shares their response and before you display the answer, you can show a random runner up. This player can steal the points if the current player gets the question wrong and theirs is correct! Keeps all participates engaged for all questions.</p>
                </div>
                <figure>
                <img className='landing-page-pic bordered-pic' src={require('../../assets/photos/runner-up.png')} alt='gameboard during gameplay'/>
                </figure>
            </section>

            <section className='flex-box-sb landing-page-section'>
                <div className='landing-page-txt-div'>
                    <h2>Search, Edit, Save.</h2>
                    <p>Search public games from other uses. View, edit, and save them to your own library!</p>
                </div>
                <figure>
                <img className='landing-page-pic' src={require('../../assets/photos/publicGames.png')} alt='homepage where users are presented with a list of public games'/>
                </figure>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default LandingPage;