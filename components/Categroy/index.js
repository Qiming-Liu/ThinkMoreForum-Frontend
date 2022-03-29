import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { Badge, Box, Card, Grid, Typography, Link, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
          </Paper>
        </Link>
      </NextLink>
    </Grid>
  );
};
export default Category;
