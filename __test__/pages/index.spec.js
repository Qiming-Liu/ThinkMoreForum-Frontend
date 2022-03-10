import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Index, { getStaticProps } from '../../pages/index';

afterEach(cleanup);
const categoryInfo = {
  color: '#5048E5',
  description: null,
  headImgUrl: '/logo.png',
  id: '4268257f-e247-49d1-8682-cc743d0ebd5b',
  pinPost: null,
  postCount: 3,
  sortOrder: 0,
  title: 'Default Category',
  type: 0,
};
describe('index page', () => {
  test('contain categories info', async () => {
    const data = await getStaticProps();
    expect(new Set(data.props.categoriesInfo)).toContainEqual(categoryInfo);
  });
  it('should desplay no category ', () => {
    const { getByText } = render(<Index />);
    expect(getByText('No category available now')).toBeInTheDocument();
  });
});
