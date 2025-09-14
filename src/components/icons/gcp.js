import React from 'react';
import { Icon } from './icon';

const GCP = ({ ...props }) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
  </Icon>
);

export default GCP;
