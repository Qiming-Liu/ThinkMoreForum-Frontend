import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Index, { getStaticProps } from '../../pages/index';

afterEach(cleanup);
const categoryInfo = 'Games';
describe('index page', () => {
  test('contain categories info', async () => {
    const data = await getStaticProps();
    expect(data.props.categoriesInfo[0].title).toEqual(categoryInfo);
  });
  it('should desplay no category ', () => {
    const { getByText } = render(<Index />);
    expect(getByText('No category available now')).toBeInTheDocument();
  });
});
