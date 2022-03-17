import React from 'react';
import Image from 'next/image';
import { Badge, Typography, Grid } from '@mui/material';

const StyleB = (props) => {
  const { color, title, description, postCount, headImgUrl } = props;

  return (
    <Grid
      alignItems="center"
      container
      sx={{
        backgroundColor: color,
        borderRadius: 1,
        color: '#FFFFFF',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        p: 6,
      }}
    >
      <Grid item xs={12} sm={7}>
        <Badge color="secondary" badgeContent={`${postCount} Posts`}>
          <Typography color="inherit" variant="h3">
            {title}
          </Typography>
        </Badge>
        <Typography color="neutral.500" sx={{ mt: 2 }} variant="body1">
          {description}
        </Typography>
      </Grid>
      <Image src={headImgUrl} height="200" width="200" alt="logo" />
    </Grid>
  );
};
export default StyleB;
