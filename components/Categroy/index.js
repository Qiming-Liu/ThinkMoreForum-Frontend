import React from 'react';
import { Grid, Link, Paper } from '@mui/material';
import StyleA from './StyleA';
import StyleB from './StyleB';

const Category = (props) => {
  const { type, color, title, description, postCount } = props;

  return (
    <Grid item xs={12}>
      <Paper elevation={24}>
        <Link href="/post">
          {type === 'A' ? (
            <StyleA
              color={color}
              title={title}
              description={description}
              postCount={postCount}
            />
          ) : (
            <StyleB
              color={color}
              title={title}
              description={description}
              postCount={postCount}
            />
          )}
        </Link>
      </Paper>
    </Grid>
  );
};
export default Category;
