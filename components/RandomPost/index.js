import Image from 'next/image';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Comments from './components/Comments';
import photo from '../../public/logo.svg';
import { getMaxCountCommentPost } from '../../services/Public';

const PostContainer = styled.div`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 330px;
`;
const CommentContainer = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;

const RandomPoat = () => {
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState(null);

  useEffect(() => {
    const getpost = async () => {
      const { data: result } = await getMaxCountCommentPost();
      setPost(result.post);
      setComments(result.comments);
    };
    getpost();
  }, []);
  return (
    <PostContainer>
      <Image
        src={post ? post.headImgUrl : photo}
        width={330}
        height={350}
        layout="responsive"
      />
      {comments &&
        comments.map((comment) => (
          <CommentContainer sx={{ mt: 1, ml: 1 }}>
            <Comments comment={comment} />
          </CommentContainer>
        ))}
    </PostContainer>
  );
};

export default RandomPoat;
