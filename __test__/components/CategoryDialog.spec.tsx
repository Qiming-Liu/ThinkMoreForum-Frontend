import React from 'react';
import { render } from '@testing-library/react';
import CategoryDialog from 'components/CategoryManager/CategoryDialog';

describe('<Popup />', () => {
  it('should render nothing when setOpenPopup is false', () => {
    const { queryByText } = render(<CategoryDialog openDialog={false} />);
    expect(queryByText('New category')).toBeNull();
  });
  it('should render CategoryForm when setOpenPopup is true', () => {
    const { container } = render(
      <CategoryDialog openDialog={true}>
        This is category dialog
      </CategoryDialog>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
