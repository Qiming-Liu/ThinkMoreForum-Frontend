import React from 'react';
import { Button, Typography, Grid } from '@mui/material';

const Category = () => {
  return (
    <Grid
      alignItems="center"
      container
      sx={{
        backgroundColor: 'neutral.900',
        borderRadius: 1,
        color: '#FFFFFF',
        px: 4,
        py: 8,
      }}
    >
      <Grid item xs={12} sm={7}>
        <Typography color="inherit" variant="h3">
          Reach 50K+ potential candidates.
        </Typography>
        <Typography color="neutral.500" sx={{ mt: 2 }} variant="body1">
          Post your job today for free. Promotions start at $99.
        </Typography>
        <Button
          color="secondary"
          size="large"
          sx={{ mt: 3 }}
          variant="contained"
        >
          Post a job
        </Button>
      </Grid>
      <Grid
        item
        sm={5}
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
      >
        <img alt="" src="/static/mock-images/jobs/job_browse_header.svg" />
      </Grid>
    </Grid>
  );
};
export default Category;
