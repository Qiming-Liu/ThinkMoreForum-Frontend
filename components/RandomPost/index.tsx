import React, { useEffect } from 'react';
import styled from 'styled-components';
// @ts-ignore
import Comments from './Comments.tsx';
import photo from '../../public/logo.svg';
import { getMaxCountCommentPost } from '../../services/Public';

const PostContainer = styled.div`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
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

const RandomPost = () => {
  const [post, setPost] = React.useState<any | null>(null);
  const [comments, setComments] = React.useState<any | null>(null);
  const image: typeof photo = post ? post.headImgUrl : photo;

  useEffect(() => {
    const getpost = async () => {
      try {
        const { data: result } = await getMaxCountCommentPost();
        setPost(result.post);
        setComments(result.comments);
        // eslint-disable-next-line no-empty
      } catch (e) {}
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
        comments.map((comment: any) => (
          <CommentContainer>
            <Comments comment={comment} />
          </CommentContainer>
        ))}
    </PostContainer>
  );
};

export default RandomPost;
