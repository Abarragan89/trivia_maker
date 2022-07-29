import '../Pagination/pagination.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import usePagination, { DOTS } from '../../utils/paginationHooks';

function PaginationSearch({ searchedGamesPerPage, totalGames, paginate, currentPage }) {

    const pageNumbers = usePagination(currentPage, totalGames, searchedGamesPerPage)

    const onNext = () => {
        paginate(currentPage + 1);
    };

    const onPrevious = () => {
        paginate(currentPage - 1);
    };

    const lastPage = Math.ceil(totalGames / searchedGamesPerPage)

    return (
        <div>
            <ul className='pagination-ul'>
            <li>
                    <button
                        onClick={onPrevious}
                        disabled={currentPage === 1 || lastPage === 1}
                        className={`${currentPage === 1 || lastPage === 1 ? 'disabled-chevron' : ''} chevron chev-left`}>
                        <FaChevronLeft />
                    </button>
                </li>
                {pageNumbers.map((pageNumber, index) => {

                    if (pageNumber === DOTS) {
                        return (
                            <li key={index} className="dots">
                                &#8230;
                            </li>
                        );
                    }

                    return (
                        <li
                            key={index}
                        >
                            <button
                                className={`${pageNumber === currentPage ? 'currentPaginate' : 'false'}`}
                                type="button"
                                onClick={() => paginate(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    );
                })}
                <li>
                    <button
                        onClick={onNext}
                        disabled={currentPage === lastPage || lastPage === 1}
                        className={`${currentPage === lastPage || lastPage === 1 ? 'disabled-chevron' : ''} chevron chev-right`}>
                        <FaChevronRight />
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default PaginationSearch