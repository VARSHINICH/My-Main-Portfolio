import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledArticlesSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;

  @media (max-width: 1024px) {
    padding: 90px 0;
    max-width: 900px;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
  }

  @media (max-width: 360px) {
    padding: 50px 0;
  }

  h2 {
    font-size: clamp(26px, 5vw, var(--fz-heading));
    margin-bottom: 20px;
    text-align: center;
    color: var(--lightest-slate);
    
    @media (max-width: 1024px) {
      margin-bottom: 18px;
    }

    @media (max-width: 768px) {
      margin-bottom: 15px;
    }

    @media (max-width: 480px) {
      margin-bottom: 12px;
    }
  }


  .coming-soon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 50px;

    .coming-soon-icon {
      font-size: 4rem;
      margin-bottom: 30px;
      color: var(--pink);
      animation: pulse 2s ease-in-out infinite;

      @media (max-width: 768px) {
        font-size: 3.5rem;
        margin-bottom: 25px;
      }

      @media (max-width: 480px) {
        font-size: 3rem;
        margin-bottom: 20px;
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.1); opacity: 1; }
      }
    }

    .coming-soon-title {
      font-size: clamp(16px, 2.5vw, 20px);
      font-weight: 400;
      color: var(--light-slate);
      margin-bottom: 20px;
      font-family: var(--font-sans);

      @media (max-width: 768px) {
        font-size: clamp(15px, 2.2vw, 18px);
        margin-bottom: 15px;
      }

      @media (max-width: 480px) {
        font-size: clamp(14px, 2vw, 16px);
        margin-bottom: 12px;
      }
    }

  }
`;

const Articles = () => {
  const revealTitle = useRef(null);
  const revealComingSoon = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealComingSoon.current, srConfig(200));
  }, []);

  return (
    <StyledArticlesSection id="articles">
      <h2 ref={revealTitle}>Articles</h2>
      
      <div className="coming-soon-container" ref={revealComingSoon}>
        <div className="coming-soon-icon">📝</div>
        <h3 className="coming-soon-title">Coming Soon</h3>
      </div>
    </StyledArticlesSection>
  );
};

export default Articles;
