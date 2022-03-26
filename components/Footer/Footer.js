import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Box,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DefaultFooter from './DefaultFooter';
import CustomFooter from './CustomFooter';

const Footer = () => {
  const [iscustomFooter, setIsFooter] = useState(null);
  const [showSetting, setShowSetting] = useState(false);
  const { isLogin } = useSelector((state) => state.sign);
  return (
    <Box sx={{ mt: 15 }}>
      <Divider />
      {iscustomFooter ? <CustomFooter /> : <DefaultFooter />}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        {showSetting && (
          <ButtonGroup
            size="small"
            variant="text"
            aria-label="text button group"
          >
            <Button onClick={() => setIsFooter(true)}>Custom Footer</Button>
            <Button onClick={() => setIsFooter(false)}>Default Footer</Button>
          </ButtonGroup>
        )}
        {isLogin && (
          <IconButton onClick={() => setShowSetting(!showSetting)}>
            <SettingsIcon />
          </IconButton>
        )}
      </Grid>
    </Box>
  );
};

export default Footer;
