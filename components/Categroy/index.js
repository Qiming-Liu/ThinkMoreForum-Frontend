import React from 'react';
import NextLink from 'next/link';
import { Grid, Link, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import TypeOne from './TypeOne';

const useStyles = makeStyles(
  {
    CustomPaper: {
      'transition-timing-function': 'ease-in-out',
      transition: 'transform 0.4s',
      '&:hover': {
        transform: 'translateX(-2%) translateY(-1%)',
      },
      'box-shadow': '4px 4px 8px grey',
    },
  },
  { name: 'MuiCustomPaper_toAvoidClassNameNotMatch' },
);

const Category = (props) => {
  const classes = useStyles();
  const { color, title, description, postCount, headImgUrl } = props;

  return (
    <Grid item xs={12}>
      <NextLink href={`/category/${title}`} passHref>
        <Link href={`/category/${title}`} underline="none">
          <Paper elevation={24} className={classes.CustomPaper}>
            <TypeOne
              color={color}
              title={title}
              description={
                description &&
                (description.length > 200
                  ? `${description.substring(0, 200)}...`
                  : description)
              }
              postCount={postCount}
              headImgUrl={headImgUrl}
            />
          </Paper>
        </Link>
      </NextLink>
    </Grid>
  );
};
export default Category;
