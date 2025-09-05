import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .hero-stats {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--slate);

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;

      .number {
        color: var(--pink);
        font-size: var(--fz-xl);
        font-weight: 600;
      }

      .label {
        font-size: var(--fz-xs);
        text-align: center;
      }
    }
  }

  .scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    animation: bounce 2s infinite;

    @keyframes bounce {
      0%,
      20%,
      50%,
      80%,
      100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-10px);
      }
      60% {
        transform: translateX(-50%) translateY(-5px);
      }
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Varshini Challagundla.</h2>;
  const three = (
    <h3 className="big-heading" style={{ fontSize: '2.3rem' }}>
      Full-Stack Developer | Cloud Architect | AI Enthusiast
    </h3>
  );
  const four = (
    <>
      <p>
        I'm a passionate software engineer at <strong>JPMorgan Chase</strong> building scalable,
        high-performance applications that impact millions of users. I specialize in full-stack
        development, cloud architecture, and AI/ML solutions that solve real-world problems.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://www.linkedin.com/in/varshinichallagundla/"
      target="_blank"
      rel="noreferrer">
      Let's Build Something Amazing
    </a>
  );
  const six = (
    <div className="hero-stats">
      <div className="stat">
        <div className="number">3+</div>
        <div className="label">Years Experience</div>
      </div>
      <div className="stat">
        <div className="number">15+</div>
        <div className="label">Projects Delivered</div>
      </div>
      <div className="stat">
        <div className="number">1M+</div>
        <div className="label">Users Impacted</div>
      </div>
    </div>
  );

  const items = [one, two, three, four, five, six];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
      <div className="scroll-indicator">Scroll to explore ↓</div>
    </StyledHeroSection>
  );
};

export default Hero;
