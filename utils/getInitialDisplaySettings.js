const getInitialDisplaySettings = (categoryTitle) => {
  let initialHeadImgDisplay;
  let initialSortColumn;
  let initialSortDirection;
  let initialSizePerPage;
  let initialPage;
  let initialDisplayAbstract;

  try {
    initialHeadImgDisplay = JSON.parse(
      localStorage.getItem(`postHeadIgmDisplay`),
    );
    if (initialHeadImgDisplay === null) initialHeadImgDisplay = true;
  } catch (e) {
    initialHeadImgDisplay = true;
  }

  try {
    initialSortColumn = localStorage.getItem(`sortColumn`);
    if (initialSortColumn === null) initialSortColumn = 'Create time';
  } catch (e) {
    initialSortColumn = 'Create time';
  }

  try {
    initialSortDirection = JSON.parse(localStorage.getItem(`sortDirection`));
    if (initialSortDirection === null) initialSortDirection = true;
  } catch (e) {
    initialSortDirection = true;
  }

  try {
    initialSizePerPage =
      parseInt(localStorage.getItem(`sizePerPage`), 10) || 10;
  } catch (e) {
    initialSizePerPage = 10;
  }

  try {
    initialPage =
      parseInt(sessionStorage.getItem(`${categoryTitle}_currentPage`), 10) || 0;
    if (initialPage === null) initialPage = 0;
  } catch (e) {
    initialPage = 0;
  }

  try {
    initialDisplayAbstract = JSON.parse(
      localStorage.getItem(`postAbstractDisplay`),
    );
    if (initialDisplayAbstract === null) initialDisplayAbstract = true;
  } catch (e) {
    initialDisplayAbstract = true;
  }

  return {
    initialHeadImgDisplay,
    initialSortColumn,
    initialSortDirection,
    initialSizePerPage,
    initialPage,
    initialDisplayAbstract,
  };
};

export default getInitialDisplaySettings;
