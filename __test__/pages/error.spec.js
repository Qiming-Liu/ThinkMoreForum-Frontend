import React from 'react';
import { render } from '@testing-library/react';
import Error from '../../pages/error';

describe('error page', () => {
  it('should render error message', () => {
    const { getByText } = render(<Error />);
    expect(getByText('err')).toBeInTheDocument();
    expect(getByText('hello world')).toBeInTheDocument();
  });
});
