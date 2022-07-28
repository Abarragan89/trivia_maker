export const DOTS = "...";

function usePagination({currentPage, totalCount, pageSize}) {
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

    // check if current page is the first two pages
  } else if (currentPage <= 2) {
    pageNumbers = [1, 2, 3, ...endingDots];

  // check if current page is the last two pages
  } else if (currentPage >= totalPages -1) {
    pageNumbers = [...beginningDots, totalPages -2, totalPages -1, totalPages];

  // all other options render with two siblings
  } else {
    pageNumbers = [...beginningDots, currentPage -1, currentPage, currentPage + 1,...endingDots];
  }

  // DESCRIPTION
  // This hook takes in three arguments. The totalCount and pageSize are used to determine how many pages are needed given the size of the page count. To do this, the totalCount and pageSize are divided then rounded up. Rounding up is necessary to create a page that will have any remainding blogs that do not fill up a whole page. The result is saved in totalPages. 

  // Next, I created two arrays to represent what the beginning and end of the pagination would look like. If there is only one page, only the number 1 will display. If the the user click the first two options (1 or 2), there only needs to be endingDots. If the user clicks on either of the last two pages, there will only need to be beginningDots. In all other cases, both beginningDots and endingDots would be needed as well as the current page, the page before it, and the page after it. 

  return pageNumbers;
}

export default usePagination;