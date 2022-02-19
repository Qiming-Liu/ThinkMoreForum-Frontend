import React from 'react';
import PersonalSettingHead from '../components/PersonalSetting/PersonalSettingHead';
import PersonalSettingNavigation from '../components/PersonalSetting/PersonalSettingNavigation';
import PersonalSettingContent from '../components/PersonalSetting/PersonalSettingContent';

const personalSetting = () => (
  <div className="personal__setting__header">
    <PersonalSettingHead />
    <PersonalSettingNavigation />
    <PersonalSettingContent />
  </div>
);

export default personalSetting;
