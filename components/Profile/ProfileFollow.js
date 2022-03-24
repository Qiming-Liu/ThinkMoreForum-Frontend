import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import { getFollowing, getFollower } from '../../services/Public';
import FollowCard from './FollowCard';

const ProfileFollow = (props) => {
  const { title, value, getfollowingNum, getfollowerNum } = props;
  const [follow, setFollow] = useState(null);
  useEffect(() => {
    const getFollow = async () => {
      const { data: responsefollow } = await getFollowing(value);
      setFollow(responsefollow);
      getfollowingNum(responsefollow.length);
    };
    const getFans = async () => {
      const { data: responsefollow } = await getFollower(value);
      setFollow(responsefollow);
      getfollowerNum(responsefollow.length);
    };
    if (title === 'Following') {
      getFollow();
    } else {
      getFans();
    }
  }, [getfollowerNum, getfollowingNum, title, value]);
  if (!follow) return null;
  return (
    <Card {...props}>
      <FollowCard follow={follow} title={title} />
    </Card>
  );
};

export default ProfileFollow;
