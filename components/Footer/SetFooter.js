import React, { useState, useEffect } from 'react';
import { Box, TextField, Stack, Button, Typography } from '@mui/material';
import { putComponent } from '../../services/Component';
import { getComponentByName } from '../../services/Public';
import hotToast from '../../utils/hotToast';

const SetFooter = () => {
  const [footer, setFooter] = useState('');
  const [footerinfo, setFooterInfo] = useState('');
  useEffect(() => {
    const getFooter = async () => {
      const { data } = await getComponentByName('footer');
      setFooterInfo(data.code);
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
            Make Sure you Type in HTML formatted code for custom footer
          </Typography>
        </Stack>
        <TextField
          fullWidth
          variant="filled"
          defaultValue={footerinfo}
          multiline
          rows={10}
          onChange={(e) => setFooter(e.target.value)}
        />
        <Button sx={{ mt: 2, mb: 2 }} variant="outlined" type="submit">
          Submit Changes
        </Button>
      </Box>
    </form>
  );
};

export default SetFooter;
