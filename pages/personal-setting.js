import React from 'react';
import PersonalSettingHead from '../components/PersonalSetting/components/PersonalSettingHead/PersonalSettingHead';
import PersonalSettingNavigation from '../components/PersonalSetting/components/PersonalSettingNavigation';
import PersonalSettingContent from '../components/PersonalSetting/components/PersonalSettingContent';


import Grid from '@mui/material/Grid';



const personalSetting = () => (
  <Grid container direction="column" >
    <Grid item>
      <PersonalSettingHead></PersonalSettingHead>
    </Grid>
    <Grid item>
      <PersonalSettingContent></PersonalSettingContent>
    </Grid>

  </Grid>
);

export default personalSetting;
