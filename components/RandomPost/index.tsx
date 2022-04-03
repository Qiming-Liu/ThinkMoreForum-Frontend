import React, { useEffect } from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import { Card, Box } from '@mui/material';
// @ts-ignore
import Comments from './Comments.tsx';
import photo from '../../public/logo.svg';
import { getMaxCountCommentPost } from '../../services/Public';

const CustomBox = styled(Box)`
  overflow: hidden;

  &:hover {
    overflow-y: scroll;
    overflow-y: overlay;
  }
`;

const RandomPost = () => {
  const [post, setPost] = React.useState<any | null>(null);
  const [comments, setComments] = React.useState<any | null>(null);
  const image: typeof photo = post ? post.headImgUrl : photo;

  useEffect(() => {
    const getpost = async () => {
      const { data: result } = await getMaxCountCommentPost();
      setPost(result.post);
      setComments(result.comments);
    };
    getpost();
  }, []);

  return (
    <Card
      style={{
        borderRadius: '16px',
        paddingBottom: '10px',
        backgroundColor: '#ffffff',
        marginRight: '30px',
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '85vh',
        alignItems: 'center',
      }}
      elevation={2}
    >
      <NextLink
        href={{
          pathname: `/post/${post ? post.id : ''}`,
        }}
        passHref
      >
        <Box
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            width: '95%',
            marginTop: '10px',
            height: '350px',
            borderRadius: 'inherit',
            cursor: 'pointer',
          }}
        />
      </NextLink>
      <CustomBox
        style={{
          position: 'relative',
          width: '95%',
          borderRadius: 'inherit',
          marginTop: '15px',
        }}
      >
        {comments &&
          comments.map((comment: any) => (
            <Card sx={{ mb: 2, px: 1 }}>
              <Comments comment={comment} />
            </Card>
          ))}
      </CustomBox>
    </Card>
  );
};

export default RandomPost;
