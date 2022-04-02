import React, { useState, useEffect } from 'react';
import { getFollowing, getFollower } from '../../services/Public';
import FollowCard from './FollowCard';

const ProfileFollow = (props) => {
  const { title, value, status } = props;
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
      // console.log(status);
      if (title === 'Following') {
        getFollow();
      } else {
        getFans();
      }
    }
  }, [title, value, status]);
  if (!follow) return null;
  return <FollowCard follow={follow} title={title} />;
};

export default ProfileFollow;
