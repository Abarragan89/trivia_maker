export const DOTS = "...";

function usePagination(currentPage, totalCount, pageSize) {
  // create empty array to store page numbers
  let pageNumbers = [] ;
  
  // Calculate total page numbers based on page size
  const totalPages = Math.ceil(totalCount / pageSize);

  // Adjust the look of pagination and DOTS based on current page
  const endingDots = [DOTS, totalPages];
  const beginningDots = [1, DOTS];

  // Check if there is only one page
  if (totalPages === 1){
    pageNumbers = [1];

  } else if (totalPages === 2 ) {
    pageNumbers = [1, 2]
    // check if current page is the first two pages
  } else if (totalPages === 3) {
    pageNumbers = [1, 2, 3]

  } else if (currentPage <= 2) {
    pageNumbers = [1, 2, 3, ...endingDots];

  // check if current page is the last two pages
  } else if (currentPage >= totalPages -1) {
    pageNumbers = [...beginningDots, totalPages -2, totalPages -1, totalPages];

  // all other options render with two siblings
  } else {
    pageNumbers = [...beginningDots, currentPage -1, currentPage, currentPage + 1,...endingDots];
  }

 

  return pageNumbers;
}

export default usePagination;