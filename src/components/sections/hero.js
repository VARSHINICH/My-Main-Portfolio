import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const HeroSection = styled.section`
  padding-top: 100px; /* Add padding to push content below the header */
  @media (max-width: 768px) {
    padding-top: 120px; /* Adjust for mobile view */
  }
`;

const StyledHeroSection = styled(HeroSection)`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0 20px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  @media (max-width: 768px) {
    padding: 0 15px;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 768px) {
      margin: 0 0 20px 0;
      text-align: center;
    }

    @media (max-width: 480px) {
      margin: 0 0 15px 0;
      font-size: clamp(var(--fz-xs), 4vw, var(--fz-sm));
    }
  }

  h2 {
    font-size: clamp(40px, 8vw, 80px);
    line-height: 1.1;
    margin: 0;

    @media (max-width: 768px) {
      text-align: center;
      font-size: clamp(35px, 7vw, 60px);
    }

    @media (max-width: 480px) {
      font-size: clamp(30px, 6vw, 45px);
      line-height: 1.2;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
    font-size: clamp(20px, 4vw, 40px);

    @media (max-width: 768px) {
      text-align: center;
      font-size: clamp(18px, 3.5vw, 30px);
      line-height: 1.1;
    }

    @media (max-width: 480px) {
      font-size: clamp(16px, 3vw, 24px);
      margin-top: 15px;
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
    font-size: clamp(16px, 2vw, 20px);
    line-height: 1.6;

    @media (max-width: 768px) {
      text-align: center;
      max-width: 100%;
      margin: 20px auto 0;
      font-size: clamp(14px, 2.5vw, 18px);
    }

    @media (max-width: 480px) {
      font-size: clamp(13px, 2.2vw, 16px);
      margin: 15px auto 0;
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    font-size: clamp(14px, 2vw, 16px);
    padding: 12px 20px;

    @media (max-width: 768px) {
      margin-top: 40px;
      padding: 10px 18px;
    }

    @media (max-width: 480px) {
      margin-top: 30px;
      padding: 8px 16px;
      font-size: 14px;
    }
  }

  .hero-stats {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--slate);
    width: 100%;
    justify-content: center;

    @media (max-width: 768px) {
      flex-direction: row;
      gap: 1.5rem;
      margin-top: 1.5rem;
      flex-wrap: wrap;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 80px;

      @media (max-width: 768px) {
        min-width: 70px;
      }

      @media (max-width: 480px) {
        min-width: 60px;
      }

      .number {
        color: var(--pink);
        font-size: clamp(var(--fz-lg), 3vw, var(--fz-xl));
        font-weight: 600;
        line-height: 1;

        @media (max-width: 480px) {
          font-size: clamp(var(--fz-md), 2.5vw, var(--fz-lg));
        }
      }

      .label {
        font-size: clamp(var(--fz-xs), 1.5vw, var(--fz-sm));
        text-align: center;
        margin-top: 4px;

        @media (max-width: 480px) {
          font-size: var(--fz-xs);
        }
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

    @media (max-width: 768px) {
      bottom: 20px;
      font-size: 12px;
    }

    @media (max-width: 480px) {
      bottom: 15px;
      font-size: 11px;
    }

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
