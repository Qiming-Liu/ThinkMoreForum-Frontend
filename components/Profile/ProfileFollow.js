import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import { getFollowing } from '../../services/Follow';
import FollowCard from './FollowCard';

const ProfileFollow = (props) => {
  const { title, value } = props;
  const [follow, setFollow] = useState(null);
  useEffect(() => {
    const getFollow = async () => {
      const { data: responsefollow } = await getFollowing(value);
      setFollow(responsefollow);
    };
    getFollow();
  }, [value]);
  if (!follow) return null;
  return (
    <Card {...props}>
      <FollowCard follow={follow} title={title} />
    </Card>
  );
};

export default ProfileFollow;
