import React from 'react';
import Grid from '@mui/material/Grid';
import PersonalSettingContent from './PersonalSettingContent';

const personalSetting = () => (
  <Grid container direction="column">
    <Grid item>
      <div>
        <h1>Account</h1>
      </div>
    </Grid>
    <Grid item>
      <PersonalSettingContent />
    </Grid>
  </Grid>
);

export default personalSetting;
