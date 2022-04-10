import React from 'react';
import { useRouter } from 'next/router';
import CommonContainer from '../../components/Layout/common-container';
import PostEdit from '../../components/Post/PostEdit';

const EditPost = () => {
  const router = useRouter();
  const { postId } = router.query;
  return (
    <CommonContainer>
      <PostEdit postId={postId} />
    </CommonContainer>
  );
};

export default EditPost;
