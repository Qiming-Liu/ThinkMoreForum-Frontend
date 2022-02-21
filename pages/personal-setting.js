import React from 'react';
import PersonalSettingHead from '../components/PersonalSetting/PersonalSettingHead';
import PersonalSettingNavigation from '../components/PersonalSetting/PersonalSettingNavigation';
import PersonalSettingContent from '../components/PersonalSetting/PersonalSettingContent';
import PersonalSettingPassword from '../components/PersonalSetting/PersonalSettingPassword';

const personalSetting = () => (
  <div className="personal__setting__header">
    <PersonalSettingHead />
    <PersonalSettingNavigation />
    <PersonalSettingContent />
    <PersonalSettingPassword />
  </div>
);

export default personalSetting;
