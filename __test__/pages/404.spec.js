import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import NotFound from '../../pages/404';

afterEach(cleanup);

describe('error page', () => {
  it('should render error message', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('404 : Not Found Error')).toBeInTheDocument();
  });
  it('should render return home button', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('Go Back')).toBeInTheDocument();
  });
});
