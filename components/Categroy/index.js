import React from 'react';
import NextLink from 'next/link';
import { Grid, Link, Paper } from '@mui/material';
import TypeOne from './TypeOne';
import TypeTwo from './TypeTwo';

const Category = (props) => {
  const { type, color, title, description, postCount } = props;

  return (
    <Grid item xs={12}>
      <NextLink href="/category" passHref>
        <Link href="/category">
          <Paper elevation={24}>
            {type === 'A' ? (
              <TypeOne
                color={color}
                title={title}
                description={description}
                postCount={postCount}
              />
            ) : (
              <TypeTwo
                color={color}
                title={title}
                description={description}
                postCount={postCount}
              />
            )}
          </Paper>
        </Link>
      </NextLink>
    </Grid>
  );
};
export default Category;
