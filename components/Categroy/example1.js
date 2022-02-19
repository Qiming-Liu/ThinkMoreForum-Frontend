import React from 'react';
import Image from 'next/image';
import { Grid, Box, Button, Card, Chip, Typography } from '@mui/material';

const Category = (props) => {
  const { onDismiss, ...other } = props;
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          p: 4,
        }}
        {...other}
      >
        <Box
          sx={{
            mr: 4,
            width: 200,
            height: 200,
            '& img': {
              height: 200,
              width: 'auto',
            },
          }}
        >
          <Image
            alt="Categroy_img"
            src="/logo.png"
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <div>
          <div>
            <Chip color="secondary" label="New Post" />
          </div>
          <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
            Category style 1
          </Typography>
          <Typography color="inherit" sx={{ mt: 1 }} variant="subtitle2">
            Category description Category description Category description
            Category description Category description Category description
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button color="secondary" onClick={onDismiss} variant="contained">
              Go
            </Button>
          </Box>
        </div>
      </Card>
    </Grid>
  );
};
export default Category;
