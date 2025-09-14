import React from 'react';

const AWSLogo = ({ ...props }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    {/* Official AWS Logo - Clean Cloud Shape */}
    <path 
      d="M4 6C4 3.5 6.5 1.5 9 1.5C10.5 0.5 12.5 0 14 0C17.5 0 20 2.5 20 6C21.5 6 23 7.5 23 9C23 10.5 21.5 12 20 12C19.5 13.5 18 14.5 16.5 14.5C15 14.5 13.5 13.5 13 12C11.5 12 10 10.5 10 9C10 7.5 8.5 6 7 6C5.5 6 4 7.5 4 9C4 10.5 2.5 12 1 12C-0.5 12 -2 10.5 -2 9C-2 7.5 -0.5 6 1 6C2.5 6 4 4.5 4 3C4 1.5 5.5 0 7 0C8.5 0 10 1.5 10 3C10 4.5 11.5 6 13 6C14.5 6 16 4.5 16 3C16 1.5 17.5 0 19 0C20.5 0 22 1.5 22 3C22 4.5 23.5 6 25 6C26.5 6 28 4.5 28 3C28 1.5 26.5 0 25 0C23.5 0 22 1.5 22 3C22 4.5 20.5 6 19 6C17.5 6 16 7.5 16 9C16 10.5 14.5 12 13 12C11.5 12 10 10.5 10 9C10 7.5 8.5 6 7 6C5.5 6 4 7.5 4 9Z" 
      fill="white" 
      stroke="#FF9900" 
      strokeWidth="1.8"
    />
    
    {/* AWS Text - Dark Blue */}
    <text 
      x="12" 
      y="13.5" 
      textAnchor="middle" 
      fontSize="4.5" 
      fill="#232F3E" 
      fontWeight="bold" 
      fontFamily="Arial, sans-serif"
    >
      aws
    </text>
    
    {/* Orange Curved Arrow/Swoosh */}
    <path 
      d="M6.5 16 Q12 18.5 17.5 16" 
      stroke="#FF9900" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round"
    />
    
    {/* Arrow Point */}
    <path 
      d="M16.5 16.3 L17.5 16 L16.5 15.7" 
      stroke="#FF9900" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round"
    />
  </svg>
);

export default AWSLogo;