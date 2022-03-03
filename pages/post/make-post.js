import React from 'react';
import { useRouter } from 'next/router';
import PostCreate from '../../components/Post/PostCreate';

const NewPost = () => {
  const router = useRouter();
  const { categoryId, categoryTitle } = router.query;
  return <PostCreate categoryId={categoryId} categoryTitle={categoryTitle} />;
};

export default NewPost;
