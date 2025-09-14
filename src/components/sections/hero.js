import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: row;
  align-items: center;
  min-height: 100vh;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
  gap: 3rem;

  @media (max-width: 1024px) {
    gap: 2.5rem;
    padding: 0 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    padding: 0 20px;
    min-height: 90vh;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
    padding: 0 15px;
    min-height: 85vh;
  }

  h1 {
    margin: 0 0 15px 4px;
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: clamp(14px, 2.5vw, 16px);
    font-weight: 400;

    @media (max-width: 768px) {
      margin: 0 0 12px 0;
    }

    @media (max-width: 480px) {
      margin: 0 0 8px 0;
      font-size: clamp(12px, 2vw, 14px);
    }
  }

  h2 {
    font-size: clamp(40px, 6vw, 60px);
    line-height: 1.1;
    margin: 0;
    font-weight: 600;
    color: var(--lightest-slate);
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: clamp(35px, 5vw, 50px);
    }

    @media (max-width: 480px) {
      font-size: clamp(30px, 4vw, 40px);
      line-height: 1.2;
    }
  }

  h3 {
    margin-top: 8px;
    color: var(--slate);
    line-height: 1.2;
    font-size: clamp(20px, 3vw, 28px);
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: clamp(18px, 2.5vw, 24px);
      line-height: 1.3;
    }

    @media (max-width: 480px) {
      font-size: clamp(16px, 2vw, 20px);
      margin-top: 12px;
    }
  }

  p {
    margin: 15px 0 0;
    max-width: 500px;
    font-size: clamp(16px, 2vw, 18px);
    line-height: 1.6;
    color: var(--slate);

    @media (max-width: 768px) {
      max-width: 100%;
      margin: 15px auto 0;
      font-size: clamp(15px, 2.2vw, 17px);
    }

    @media (max-width: 480px) {
      font-size: clamp(14px, 2vw, 16px);
      margin: 12px auto 0;
    }
  }

  .hero-social {
    display: flex;
    gap: 18px;
    margin-top: 30px;
    justify-content: flex-start;

    @media (max-width: 768px) {
      margin-top: 25px;
      gap: 16px;
      justify-content: center;
    }

    @media (max-width: 480px) {
      margin-top: 20px;
      gap: 14px;
    }

    .social-link {
      ${({ theme }) => theme.mixins.flexCenter};
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--light-navy);
      color: var(--lightest-slate);
      border: 1px solid rgba(255, 165, 165, 0.2);
      transition: var(--transition);
      text-decoration: none;

      &:hover {
        background-color: var(--pink);
        color: var(--dark-navy);
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(255, 165, 165, 0.3);
      }

      svg {
        width: 20px;
        height: 20px;
      }

      @media (max-width: 768px) {
        width: 45px;
        height: 45px;
        
        svg {
          width: 18px;
          height: 18px;
        }
      }

      @media (max-width: 480px) {
        width: 42px;
        height: 42px;
        
        svg {
          width: 17px;
          height: 17px;
        }
      }
    }
  }
`;

const StyledHeroContent = styled.div`
  flex: 1;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const StyledHeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    flex: 0.8;
  }

  @media (max-width: 768px) {
    order: -1;
    flex: none;
    margin-bottom: 1rem;
  }

  .image-wrapper {
    position: relative;
    width: 280px;
    height: 350px;
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid var(--pink);
    box-shadow: 0 0 20px rgba(255, 165, 165, 0.2);

    @media (max-width: 1024px) {
      width: 250px;
      height: 320px;
    }

    @media (max-width: 768px) {
      width: 220px;
      height: 280px;
      border-width: 2px;
    }

    @media (max-width: 480px) {
      width: 200px;
      height: 250px;
      border-width: 2px;
    }

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
      border-radius: 10px;
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
  const two = <h2 className="big-heading">Varshini Challagundla</h2>;
  const three = <h3 className="big-heading">I build accessible, scalable digital experiences for the web.</h3>;
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
    <div className="hero-social">
      <a
        className="social-link"
        href="https://www.linkedin.com/in/varshinichallagundla/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn">
        <Icon name="Linkedin" />
      </a>
      <a
        className="social-link"
        href="https://github.com/varshinichallagundla"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub">
        <Icon name="GitHub" />
      </a>
      <a
        className="social-link"
        href="mailto:varshinichallagundla@gmail.com"
        aria-label="Email">
        <Icon name="Email" />
      </a>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection id="hero">
      <StyledHeroContent>
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
      </StyledHeroContent>
      
      <StyledHeroImage>
        <div className="image-wrapper">
          <StaticImage
            src="../../images/varshini2.jpg"
            alt="Varshini Challagundla"
            width={250}
            height={250}
            quality={95}
            formats={['AUTO', 'WEBP']}
          />
        </div>
      </StyledHeroImage>
    </StyledHeroSection>
  );
};

export default Hero;
