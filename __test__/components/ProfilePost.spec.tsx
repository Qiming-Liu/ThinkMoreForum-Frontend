import React from 'react';
import { render, screen } from '@testing-library/react';
import FollowCard from '../../components/Profile/FollowCard';

const follow = [
  {
    id: 1111,
    followedUsers: { username: 'Gabriel', headheadImgUrl: 'www.baidu.com' },
  },
];

describe('test profilepost', () => {
  it('should show the title it received', () => {
    // render(<ProfilePost title="Posts" value="Gabriel" />);
    render(<FollowCard title="Following" follow={follow} />);
    expect(screen.getByText('Following')).toBeInTheDocument();
  });
});
