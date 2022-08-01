import { QUERY_STUDY_SETS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import Header from '../../Components/Header/header';
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouse-click.wav';
import { FaPlay } from 'react-icons/fa';
import '../../Pages/HomePage/homePage.css'


function StudentDashboard() {
    // MouseClick Sound
    const [mouseClickSound] = useSound(mouseClick, { volume: .6 })
    const teacherName = useParams().teacher
    const { data } = useQuery(QUERY_STUDY_SETS, {
        variables: { name: teacherName }
    })
    const gameData = data?.queryStudySets || [];
    console.log(data)

    return (
        <>
            <Header />
                <main id='student-dashboard'>
                    <h1>{teacherName}'s Study Sets</h1>
                    <section id='student-dashboard-card-section'>
                        {gameData.map((studySet, index) => (
                            <div key={index}>
                                <article id='link-to-public'>
                                    <div className='public-game-card'>
                                        <header className='flex-box-sb'>
                                            <h2>{studySet.gameTopic}</h2>
                                            <div>
                                                <Link onClick={() => mouseClickSound()} to={`/student-study/${studySet._id}`}
                                                >
                                                    <button title='Play' className='public-feed-btns'><FaPlay /></button><br />
                                                </Link>
                                            </div>
                                        </header>
                                        <div className='flex-box-sb'>
                                            <p>Questions: {studySet.questionCount}</p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </section>
                </main>
        </>
    )
}

export default StudentDashboard;