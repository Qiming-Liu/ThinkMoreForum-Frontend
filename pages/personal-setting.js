import React from 'react';
import PersonalSetting from '../components/PersonalSetting';
import PersonalSettingPassword from '../components/PersonalSetting/PersonalSettingPassword';

const personalSetting = () => (
  <>
    <PersonalSetting />
    <div className="personal__setting__header">
      <PersonalSettingPassword />
    </div>
  </>
);

export default personalSetting;
