import React from 'react';
import { render } from '@testing-library/react';
import Popup from '../../components/CategoryManager/Popup';

describe('<Popup />', () => {
  it('should render nothing when setOpenPopup is false', () => {
    const { queryByText } = render(
      <Popup openPopup={false} setOpenPopup={() => {}} />,
    );
    expect(queryByText('New category')).toBeNull();
  });
  it('should render CategoryForm when setOpenPopup is true', () => {
    const { container } = render(
      <Popup openPopup setOpenPopup={() => {}}>
        This is category form
      </Popup>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
