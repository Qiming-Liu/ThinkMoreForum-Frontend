import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import { getFollowing, getFollower } from '../../services/Public';
import FollowCard from './FollowCard';

const ProfileFollow = (props) => {
  const { title, value } = props;
  const [follow, setFollow] = useState(null);
  useEffect(() => {
    if (value) {
      const getFollow = async () => {
        const { data: responsefollow } = await getFollowing(value);
        setFollow(responsefollow);
      };
      const getFans = async () => {
        const { data: responsefollow } = await getFollower(value);
        setFollow(responsefollow);
      };
      if (title === 'Following') {
        getFollow();
      } else {
        getFans();
      }
    }
  }, [title, value]);
  if (!follow) return null;
  return (
    <Card {...props}>
      <FollowCard follow={follow} title={title} />
    </Card>
  );
};

export default ProfileFollow;
