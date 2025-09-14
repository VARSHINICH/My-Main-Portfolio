import React from 'react';

const TerraformLogo = ({ ...props }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    {/* HashiCorp Terraform Associate Logo - Purple with white square */}
    <circle cx="12" cy="12" r="10" fill="#7B42BC"/>
    <rect x="9" y="9" width="6" height="6" fill="white" rx="0.5"/>
    <rect x="10" y="10" width="4" height="4" fill="#7B42BC" rx="0.3"/>
    <text x="12" y="19" textAnchor="middle" fontSize="3" fill="white" fontWeight="bold">TF</text>
  </svg>
);

export default TerraformLogo;