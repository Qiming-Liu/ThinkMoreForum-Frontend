import React, { useState, useEffect } from 'react';
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
import { putComponent } from '../../services/Component';
import { getComponentByName } from '../../services/Public';
import DefaultFooter from './DefaultFooter';
import CustomFooter from './CustomFooter';
import checkPermission from '../../utils/checkPermission';
import hotToast from '../../utils/hotToast';

const Footer = () => {
  const [iscustomFooter, setIsFooter] = useState(null);
  const [showSetting, setShowSetting] = useState(false);
  const [footerinfo, setFooterInfo] = useState('');
  const { isLogin, myDetail } = useSelector((state) => state.sign);
  useEffect(() => {
    const getFooter = async () => {
      const { data: response } = await getComponentByName('footer');
      setFooterInfo(response);
      if (response.code === '') {
        setIsFooter(false);
      } else {
        setIsFooter(true);
      }
    };
    getFooter();
  }, []);
  const putCustomComponent = async (code) => {
    try {
      const requestBody = {
        code,
        id: footerinfo.id,
        name: footerinfo.name,
      };
      await putComponent(requestBody);
    } catch (err) {
      hotToast('error', err.response.data.error);
    }
  };
  const handleChangetoDefault = () => {
    putCustomComponent('');
    window.location.reload();
  };
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
            <Button type="button" onClick={() => handleChangetoDefault()}>
              Default Footer
            </Button>
          </ButtonGroup>
        )}
        {isLogin && (
          <IconButton
            onClick={() =>
              checkPermission('adminManagement', myDetail.role) &&
              setShowSetting(!showSetting)
            }
          >
            <SettingsIcon />
          </IconButton>
        )}
      </Grid>
    </Box>
  );
};

export default Footer;
