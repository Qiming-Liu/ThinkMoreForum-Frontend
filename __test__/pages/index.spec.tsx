import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Index from '../../pages';

afterEach(cleanup);
describe('index page', () => {
  it('should desplay no category ', () => {
    const { getByText } = render(<Index />);
    expect(getByText('No category available now')).toBeInTheDocument();
  });
});
