import React from 'react';
import Image from 'next/image';
import { Badge, Box, Card, Grid, Typography } from '@mui/material';

const StyleA = (props) => {
  const { color, title, description, postCount, headImgUrl } = props;

  return (
    <Card
      sx={{
        alignItems: 'center',
        backgroundColor: color,
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        p: 6,
      }}
    >
      <Grid item xs={12} sm={3}>
        <Image src={headImgUrl} height="200" width="200" alt="logo" />
      </Grid>
      <Box>
        <Badge color="secondary" badgeContent={`${postCount} Posts`}>
          <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
            {title}
          </Typography>
        </Badge>
        <Typography color="inherit" sx={{ mt: 1 }} variant="subtitle2">
          {description}
        </Typography>
      </Box>
    </Card>
  );
};
export default StyleA;
