import './createGame.css';
import Auth from '../../utils/auth';

function CreateGame() {
    // used to check if the user is logged in
    const loggedIn = Auth.loggedIn()

    // submit the game
    function handleSubmit(e) {
        e.preventDefault();
        // this creates a nodelist
        let formData = document.querySelectorAll('#create-game-form textarea')
        // make nodelist into array then reduce into an object
        formData = Array.from(formData).reduce((acc, textarea) => ({
            
            ...acc, [textarea.id]: textarea.value,
        }), {})

        let categoryData = document.querySelectorAll('#create-game-form input')
        categoryData = Array.from(categoryData).reduce((acc, input) => ({
            ...acc, [input.id]: input.value
        }), {})
        console.log(categoryData)
        console.log(formData) 
    }
    return (
        <>
            {loggedIn ?
                <form id="create-game-form" onSubmit={handleSubmit}>
                    <ul id='question-accordion'>
                        <li>
                            <label htmlFor='category-one-radio' className='flex-box-sb'>Category One</label>
                            <input type='radio' id='category-one-radio' name='accordion'></input>
                            <section className='question-content'>

                                <label htmlFor='category-one-name'>Category</label>
                                <input type='text' id='category-one-name' name='category-one-name' />

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q1'>$100 Question</label>
                                    <textarea id='c1-q1' name='c1-q1'></textarea>
                                    <label htmlFor='c1-a1'>Answer</label>
                                    <textarea id='c1-a1' name='c1-a1'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q2'>$200 Question</label>
                                    <textarea id='c1-q2' name='c1-q2'></textarea>
                                    <label htmlFor='c1-a2'>Answer</label>
                                    <textarea id='c1-a2' name='c1-a2'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q3'>$300 Question</label>
                                    <textarea id='c1-q3' name='c1-q3'></textarea>
                                    <label htmlFor='c1-a3'>Answer</label>
                                    <textarea id='c1-a3' name='c1-a3'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q4'>$400 Question</label>
                                    <textarea id='c1-q4' name='c1-q4'></textarea>
                                    <label htmlFor='c1-a4'>Answer</label>
                                    <textarea id='c1-a4' name='c1-a4'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q5'>$500 Question</label>
                                    <textarea id='c1-q5' name='c1-q5'></textarea>
                                    <label htmlFor='c1-a5'>Answer</label>
                                    <textarea id='c1-a5' name='c1-a5'></textarea>
                                </div>
                            </section>
                        </li>
                        <li>
                            <label htmlFor='category-two-radio' className='flex-box-sb'>Category Two</label>
                            <input type='radio' id='category-two-radio' name='accordion'></input>
                            <section className='question-content'>

                                <label htmlFor='category-two-name'>Category</label>
                                <input type='text' id='category-two-name' name='category-two-name' />

                                <div className='single-question-div'>
                                    <label htmlFor='c2-q1'>$100 Question</label>
                                    <textarea id='c2-q1' name='c2-q1'></textarea>
                                    <label htmlFor='c2-a1'>Answer</label>
                                    <textarea id='c2-a1' name='c2-a1'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c2-q2'>$200 Question</label>
                                    <textarea id='c2-q2' name='c2-q2'></textarea>
                                    <label htmlFor='c2-a2'>Answer</label>
                                    <textarea id='c2-a2' name='c2-a2'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c2-q3'>$300 Question</label>
                                    <textarea id='c2-q3' name='c2-q3'></textarea>
                                    <label htmlFor='c2-a3'>Answer</label>
                                    <textarea id='c2-a3' name='c2-a3'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c4-q4'>$400 Question</label>
                                    <textarea id='c4-q4' name='c4-q4'></textarea>
                                    <label htmlFor='c4-a4'>Answer</label>
                                    <textarea id='c4-a4' name='c4-a4'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c5-q5'>$500 Question</label>
                                    <textarea id='c5-q5' name='c5-q5'></textarea>
                                    <label htmlFor='c5-a5'>Answer</label>
                                    <textarea id='c5-a5' name='c5-a5'></textarea>
                                </div>
                            </section>
                        </li>
                    </ul>
                    <button type='submit'>Create Game</button>
                </form>
                :
                <p>404: You must be signed in to see this page</p>
            }
        </>
    )
}

export default CreateGame;