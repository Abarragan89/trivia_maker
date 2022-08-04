import Header from "../../Components/Header/header";
import './about.css'

function About() {
    return (
        <>
            <Header />
            <main className=' section contact-page'>
                <h1><span>About</span></h1>
                <article id='about-page'>
                    <p>Hello User,</p>
                    <br />
                    <p>
                        My goal was for this app to help teachers make fun review games to reinforce their curriculum. As a teacher, I wanted a game generator that was easy to make and fun for my students. I like games  that incorporate a bit of chance and randomness. Classroom games that are based solely on knowing the correct answer tend to lead to the same winners game after game and a remaining classroom of unmotivated students.
                    </p><br />
                    <p><i>Who Nose That</i> aims to satisfy these needs. Teachers can generate a gameboard quickly without having to make up 3 false answer for each question. Since it’s not inherently multiple choice (although questions can be set up that way), students cannot just guess the correct answer. Additionally, <i>Who Nose That</i> encourages pair/group gameplay in classrooms so that students can think-pair-share, work cooperatively, and stay engaged in the game. Students with correct responses move on to the exciting Bonus Round! This is where luck and skill can separate you from the pack. You can adjust the ball speed to accommodate younger children or just go insane and make it complete luck!
                    </p><br />
                    <p>The random runner up is a feature designed to keep all students engaged even if it’s not their turn. Game facilitators have the option to reveal a random runner up after the current player gives their response. The runner up can steal the points if they are correct and the current player is incorrect!
                    </p><br />
                    <p>When making a gameboard, you have the option of making it public and generating a study set. Public games can be played and copied by other users. These copies can be edited and saved to your personal library. Generating a study sets creates flashcards that students can access through the student portal. Here students try to “keep it 100”. They start off with 100 points and lose a point for every incorrect response or every time they need to flip a card over .This helps prepare students and allows them to feel confident during gameplay.
                    </p><br />
                    <p>I hope you find value in this application and it is beneficial for you and your students. Maybe you just want to make a gameboard for family trivia night, a birthday, baby shower, engagement party, etc. If you enjoy this site, I only ask that you share it in any way you can. And if you are able, I would appreciate any donations to help me keep this site up and running.
                    </p><br />
                    <span>Cheers,<br />
                    <i>Who Nose That</i>
                    </span>
                    <div id='donation-texts'>
                                    <a href="https://www.buymeacoffee.com/anthonybar" rel='noreferrer' target="_blank">
                                        <img id='buy-me-coffee-img'
                                            src={"https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"} alt="Buy Me A Coffee"
                                            style={{
                                                height: '40px',
                                                width: '150px',
                                                display: 'block',
                                                margin: '0 auto',
                                                marginTop: '5px'
                                            }} />
                                    </a>

                                </div>
                </article>
            </main>
        </>
    )
}

export default About;