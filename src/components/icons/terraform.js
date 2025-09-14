import React from 'react';

const Terraform = ({ ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M9 9h6v6H9z" fill="currentColor" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export default Terraform;
