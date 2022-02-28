import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import { getFollowing } from '../../services/followServices';
import FollowCard from './FollowCard';

const ProfileFollow = (props) => {
  const { title, value } = props;
  const [follow, setFollow] = useState(null);
  useEffect(() => {
    const getFollow = async () => {
      const { data: responsefollow } = await getFollowing(value);
      // (暂时标记一下)useeffect不传第二个参数不传会循环执行第一个参数，若传则只会在存放变量改变时再次执行
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
