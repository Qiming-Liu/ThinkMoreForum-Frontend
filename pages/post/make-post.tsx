import React from 'react';
import { useRouter } from 'next/router';
import CommonContainer from '../../components/Layout/common-container';
import PostCreate from '../../components/Post/PostCreate';

const MakePost = () => {
  const router = useRouter();
  const { categoryTitle } = router.query;
  return (
    <CommonContainer>
      <PostCreate categoryTitle={categoryTitle} />
    </CommonContainer>
  );
};

export default MakePost;
