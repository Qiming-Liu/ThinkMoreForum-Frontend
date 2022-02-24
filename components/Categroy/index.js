import React from 'react';
import NextLink from 'next/link';
import { Grid, Link, Paper } from '@mui/material';
import TypeOne from './TypeOne';
import TypeTwo from './TypeTwo';

const Category = (props) => {
  const { type, color, title, description, postCount } = props;

  return (
    <Grid item xs={12}>
      <NextLink href={`/category/${title}`} passHref>
        <Link href={`/category/${title}`}>
          <Paper elevation={24}>
            {console.log(`typs is ${type}`)}
            {type === 0 ? (
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
