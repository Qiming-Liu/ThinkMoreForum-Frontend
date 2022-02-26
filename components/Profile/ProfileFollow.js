import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import { getFollowing } from '../../services/followServices';
// 这里踩了个坑，查了一天，组件里面命名首字母得是大写，不然导入不进来。不知道是啥原理
import FollowCard from './FollowCard';

const ProfileFollow = (props) => {
  const { title, value } = props;
  const [follow, setFollow] = useState(null);
  useEffect(() => {
    const getFollow = async () => {
      const { data: responsefollow } = await getFollowing(value);
      // 这里发现页面会不断得请求，还不明白原理
      // console.log(responsefollow);
      setFollow(responsefollow);
    };
    getFollow();
  });
  if (!follow) return null;
  return (
    <Card {...props}>
      <FollowCard follow={follow} title={title} />
    </Card>
  );
};

export default ProfileFollow;
