import '../Pagination/pagination.css'

function PaginationSearch ({ searchedGamesPerPage, totalGames, paginate}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalGames / searchedGamesPerPage); i++)
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

export default PaginationSearch