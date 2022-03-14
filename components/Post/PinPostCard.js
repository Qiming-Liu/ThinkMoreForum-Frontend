import React from 'react';
import NextLink from 'next/link';
import parse from 'html-react-parser';
import { Chip, Card, Typography, Link } from '@mui/material';
import { updatePostViewCount } from '../../services/Public';

const PinPostCard = (props) => {
  const { id, title, context, ...other } = props;
  const generatedUrl = `/post/${id}`;
  const handleClick = () => {
    updatePostViewCount(id);
  };
  return (
    <Card
      sx={{
        alignItems: 'center',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        p: 2,
        pt: 2,
      }}
      {...other}
    >
      <Chip color="secondary" label="PinPost" size="small" />
      <NextLink href={generatedUrl ?? ''} passHref>
        <Link href={generatedUrl ?? ''} component="a" onClick={handleClick}>
          <Typography
            color="secondary.contrastText"
            sx={{ mt: 1 }}
            variant="h4"
          >
            {title}
          </Typography>
        </Link>
      </NextLink>
      <Typography color="inherit" sx={{ mt: 1 }} variant="subtitle2">
        {context.length > 200
          ? `${context.substring(0, 200)}...`
          : parse(context)}
      </Typography>
    </Card>
  );
};

export default PinPostCard;
