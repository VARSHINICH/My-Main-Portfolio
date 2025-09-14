import React from 'react';
import { Icon } from './icon';

const AWS = ({ ...props }) => (
  <Icon {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="7" r="2" fill="currentColor"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <circle cx="12" cy="17" r="2" fill="currentColor"/>
  </Icon>
);

export default AWS;
