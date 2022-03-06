import React from 'react';
import { useRouter } from 'next/router';
import PostCreate from '../../components/Post/PostCreate';

const MakePost = () => {
  const router = useRouter();
  const { categoryTitle } = router.query;
  return <PostCreate categoryTitle={categoryTitle} />;
};

export default MakePost;
