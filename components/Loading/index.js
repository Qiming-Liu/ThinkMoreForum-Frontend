import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './loading.module.css';

const LoadingContainer = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'translate(calc(50vw - 30%), calc(50vh - 50%))',
  justifyContent: 'center',
}));

const Loading = () => {
  return (
    <LoadingContainer>
      <div className={styles.spinner}>
        <div className={styles.rect1}></div>
        <div className={styles.rect2}></div>
        <div className={styles.rect3}></div>
        <div className={styles.rect4}></div>
        <div className={styles.rect5}></div>
      </div>
    </LoadingContainer>
  );
};

export default Loading;
