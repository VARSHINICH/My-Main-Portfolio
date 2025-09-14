import React from 'react';

const GCPLogo = ({ ...props }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    {/* Google Data Analytics Professional Certificate Logo */}
    <circle cx="12" cy="12" r="10" fill="#4285F4"/>
    <rect x="8" y="8" width="8" height="8" fill="white" rx="1"/>
    <rect x="9" y="10" width="6" height="0.8" fill="#4285F4"/>
    <rect x="9" y="11.5" width="4" height="0.8" fill="#4285F4"/>
    <rect x="9" y="13" width="5" height="0.8" fill="#4285F4"/>
    <rect x="9" y="14.5" width="3" height="0.8" fill="#4285F4"/>
    <text x="12" y="19" textAnchor="middle" fontSize="3" fill="white" fontWeight="bold">GDA</text>
  </svg>
);

export default GCPLogo;