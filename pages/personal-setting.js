import React from 'react';
import PersonalSetting from '../components/PersonalSetting';
import PersonalSettingHead from '../components/PersonalSetting/PersonalSettingHead';
import PersonalSettingNavigation from '../components/PersonalSetting/PersonalSettingNavigation';
import PersonalSettingContentMin from '../components/PersonalSetting/PersonalSettingContentMin';
import PersonalSettingPassword from '../components/PersonalSetting/PersonalSettingPassword';

const personalSetting = () => (
  <>
    <PersonalSetting />
    <div className="personal__setting__header">
      <PersonalSettingHead />
      <PersonalSettingNavigation />
      <PersonalSettingContentMin />
      <PersonalSettingPassword />
    </div>
  </>
);

export default personalSetting;
