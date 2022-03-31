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
  background-color: #ffffff;
`;
const CommentContainer = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;

const RandomPoat = () => {
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const image = post ? post.headImgUrl : photo;

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
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          width: '330px',
          height: '350px',
        }}
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
