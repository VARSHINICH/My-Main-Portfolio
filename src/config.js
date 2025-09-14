module.exports = {
  email: 'varshinichallagundla123@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: '',
    },
    {
      name: 'Instagram',
      url: '',
    },
    {
      name: 'Twitter',
      url: '',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/varshinichallagundla/',
    },
    {
      name: 'Codepen',
      url: '',
    },
  ],

  navLinks: [
    {
      name: 'Home',
      url: '/#hero',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Articles',
      url: '/#articles',
    },
    {
      name: 'Certifications',
      url: '/#certifications',
    },
    {
      name: 'Technologies',
      url: '/#technologies',
    },
    {
      name: 'Resume',
      url: '/resume2.pdf',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    pink: '#ffa5a5',
    navy: '#3a2f3a',
    darkNavy: '#2a1f2a',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
