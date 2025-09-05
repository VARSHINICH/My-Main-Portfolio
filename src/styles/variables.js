import { css } from 'styled-components';

const variables = css`
  :root {
    /* FFA5A5 Complete Color System */

    /* Primary Pink Family (FFA5A5 variations) */
    --pink-darkest: #d67a7a; /* Darkest shade */
    --pink-darker: #e68a8a; /* Darker shade */
    --pink-dark: #f09595; /* Dark shade */
    --pink: #ffa5a5; /* Base color */
    --pink-light: #ffb5b5; /* Light shade */
    --pink-lighter: #ffc5c5; /* Lighter shade */
    --pink-lightest: #ffd5d5; /* Lightest shade */
    --pink-tint: rgba(255, 165, 165, 0.1);
    --pink-shadow: rgba(255, 165, 165, 0.3);

    /* Complementary Colors (based on color theory) */
    --coral-light: #ffb5c5; /* Light coral */
    --coral-dark: #e68a9a; /* Darker coral */
    --coral-lighter: #ffc5d5; /* Lighter coral */
    --coral-tint: rgba(255, 181, 197, 0.1);

    /* Analogous Colors (warm palette) */
    --coral: #ffa5b5; /* Coral variation */
    --peach: #ffb5a5; /* Peach variation */
    --rose: #ffa5d6; /* Rose variation */

    /* Triadic Colors */
    --lavender: #d6a5ff; /* Lavender accent */
    --sky: #a5d6ff; /* Sky blue accent */
    --peach-light: #ffb5a5; /* Light peach accent */

    /* Background System (warm neutrals) */
    --dark-navy: #2a1f2a; /* Warm dark background */
    --navy: #3a2f3a; /* Medium background */
    --light-navy: #4a3f4a; /* Light background */
    --lightest-navy: #5a4f5a; /* Lightest background */
    --navy-shadow: rgba(42, 31, 42, 0.7);

    /* Text Colors (warm grays) */
    --dark-slate: #8a7f8a; /* Dark text */
    --slate: #aa9faa; /* Medium text */
    --light-slate: #cabfca; /* Light text */
    --lightest-slate: #eadfea; /* Lightest text */
    --white: #faf5f5; /* Warm white */

    /* Accent Colors */
    --coral-accent: #ffa5b5; /* Coral accent */
    --coral-accent-dark: #e67a8a; /* Darker coral accent */
    --coral-accent-tint: rgba(255, 165, 181, 0.1);

    --blue: #a5d6ff; /* Light blue */
    --blue-dark: #7ab8e6; /* Darker blue */
    --blue-tint: rgba(165, 214, 255, 0.1);

    --purple: #d6a5ff; /* Light purple */
    --purple-dark: #b87ae6; /* Darker purple */
    --purple-tint: rgba(214, 165, 255, 0.1);

    --yellow: #ffe6a5; /* Light yellow */
    --yellow-dark: #e6c77a; /* Darker yellow */
    --yellow-tint: rgba(255, 230, 165, 0.1);

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;

    /* Beautiful Gradients */
    --gradient-primary: linear-gradient(135deg, var(--pink), var(--coral));
    --gradient-secondary: linear-gradient(135deg, var(--coral-light), var(--peach-light));
    --gradient-accent: linear-gradient(135deg, var(--lavender), var(--sky));
    --gradient-bg: linear-gradient(135deg, var(--navy), var(--light-navy));
    --gradient-text: linear-gradient(135deg, var(--lightest-slate), var(--pink));

    /* Enhanced Shadows */
    --shadow-pink: 0 10px 30px rgba(255, 165, 165, 0.3);
    --shadow-coral: 0 10px 30px rgba(255, 165, 181, 0.3);
    --shadow-coral-light: 0 10px 30px rgba(255, 181, 197, 0.3);
    --shadow-lavender: 0 10px 30px rgba(214, 165, 255, 0.3);
  }
`;

export default variables;
