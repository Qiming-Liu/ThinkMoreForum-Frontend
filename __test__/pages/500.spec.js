import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import NotFound from '../../pages/500';

afterEach(cleanup);

describe('Error: Internal Server', () => {
  it('should render error message', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('500 : Internal Server Error')).toBeInTheDocument();
  });
  it('should render return home button', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('Go Back')).toBeInTheDocument();
  });
});
