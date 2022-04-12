const getInitialDisplaySettings = (categoryTitle: any) => {
  let initialHeadImgDisplay;
  let initialSortColumn;
  let initialSortDirection;
  let initialSizePerPage;
  let initialPage;
  let initialDisplayAbstract;

  try {
    initialHeadImgDisplay = JSON.parse(
      localStorage.getItem(`postHeadIgmDisplay`) as string,
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
    initialSortDirection = JSON.parse(
      localStorage.getItem(`sortDirection`) as string,
    );
    if (initialSortDirection === null) initialSortDirection = true;
  } catch (e) {
    initialSortDirection = true;
  }

  try {
    initialSizePerPage =
      parseInt(localStorage.getItem(`sizePerPage`) as string, 10) || 10;
  } catch (e) {
    initialSizePerPage = 10;
  }

  try {
    initialPage =
      parseInt(
        sessionStorage.getItem(`${categoryTitle}_currentPage`) as string,
        10,
      ) || 0;
    if (initialPage === null) initialPage = 0;
  } catch (e) {
    initialPage = 0;
  }

  try {
    initialDisplayAbstract = JSON.parse(
      localStorage.getItem(`postAbstractDisplay`) as string,
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
