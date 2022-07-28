import './pagination.css';

function Pagination ({ gamesPerPage, totalGames, paginate}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++)
        pageNumbers.push(i);
    return (
        <div>
            <ul className='pagination-ul'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <p onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination