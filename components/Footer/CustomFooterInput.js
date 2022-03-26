import React, { useState, useEffect } from 'react';
import { Box, TextField, Stack, Button, Typography } from '@mui/material';
import { putComponent } from '../../services/Component';
import { getComponentByName } from '../../services/Public';
import hotToast from '../../utils/hotToast';

const CustomFooterInput = () => {
  const [footer, setFooter] = useState('');
  const [footerinfo, setFooterInfo] = useState('');
  useEffect(() => {
    const getFooter = async () => {
      const { data: response } = await getComponentByName('footer');
      setFooterInfo(response);
    };
    getFooter();
  }, []);
  const putfooter = async (code) => {
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
  const handleSubmit = () => {
    putfooter(footer);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
            Make Sure you Type in HTML formatted code
          </Typography>
        </Stack>
        <TextField
          fullWidth
          label="Change the Footer by type your code here"
          multiline
          rows={12}
          onChange={(e) => setFooter(e.target.value)}
          value={footer}
        />
        <Button sx={{ mt: 2, mb: 2 }} variant="outlined" type="submit">
          Submit Changes
        </Button>
      </Box>
    </form>
  );
};

export default CustomFooterInput;
