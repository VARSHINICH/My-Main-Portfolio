import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 100px auto 100px;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin: 80px auto 50px;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    margin: 60px auto 30px;
    padding: 0 10px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 2vw, var(--fz-md));
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(30px, 5vw, 60px);
    line-height: 1.1;
    margin-bottom: 1rem;

    @media (max-width: 480px) {
      font-size: clamp(25px, 4vw, 40px);
    }
  }

  p {
    font-size: clamp(16px, 2vw, 18px);
    line-height: 1.6;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      font-size: clamp(14px, 2.5vw, 16px);
    }

    @media (max-width: 480px) {
      font-size: clamp(13px, 2.2vw, 15px);
      margin-bottom: 1.5rem;
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

  .contact-methods {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;

    @media (max-width: 480px) {
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
  }

  .social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;

    @media (max-width: 480px) {
      gap: 0.75rem;
    }

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--light-navy);
      color: var(--slate);
      transition: var(--transition);

      @media (max-width: 480px) {
        width: 45px;
        height: 45px;
      }

      &:hover {
        background: var(--pink);
        color: var(--navy);
        transform: translateY(-3px);

        @media (max-width: 768px) {
          transform: translateY(-2px);
        }
      }

      svg {
        width: 20px;
        height: 20px;

        @media (max-width: 480px) {
          width: 18px;
          height: 18px;
        }
      }
    }
  }

  .availability {
    margin-top: 2rem;
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-xs), 1.5vw, var(--fz-sm));

    @media (max-width: 480px) {
      margin-top: 1.5rem;
      font-size: var(--fz-xs);
    }

    p {
      margin: 0.5rem 0;
      color: var(--slate);
      font-size: inherit;

      @media (max-width: 480px) {
        margin: 0.4rem 0;
      }
    }
  }

  .response-time {
    p {
      font-size: clamp(var(--fz-xxs), 1.2vw, var(--fz-xs));
      color: var(--slate);
      margin-top: 2rem;

      @media (max-width: 480px) {
        margin-top: 1.5rem;
        font-size: var(--fz-xxs);
      }
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>

      <h2 className="title">Let's Build Something Amazing Together</h2>

      <p>
        I'm always excited to work on new projects and collaborate with like-minded individuals.
        Whether you have a challenging problem to solve, an innovative idea to explore, or just want
        to discuss technology, I'd love to hear from you. Let's create something that makes a real
        impact in the world.
      </p>

      <div className="contact-methods">
        <a className="email-link" href={`mailto:${email}`} target="_blank" rel="noreferrer">
          Get In Touch
        </a>

        <div className="social-links">
          <a href="https://github.com/VARSHINICH" target="_blank" rel="noreferrer" title="GitHub">
            <Icon name="GitHub" />
          </a>
          <a
            href="https://linkedin.com/in/varshinichallagundla/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn">
            <Icon name="Linkedin" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noreferrer"
            title="Twitter">
            <Icon name="Twitter" />
          </a>
        </div>
      </div>

      <div className="availability">
        <p>
          <span style={{ color: 'var(--pink)' }}>●</span> Available for exciting new opportunities
        </p>
        <p>
          <span style={{ color: 'var(--pink)' }}>●</span> Open to freelance and consulting projects
        </p>
        <p>
          <span style={{ color: 'var(--pink)' }}>●</span> Always happy to discuss technology and
          innovation
        </p>
      </div>

      <div className="response-time">
        <p style={{ fontSize: 'var(--fz-xs)', color: 'var(--slate)', marginTop: '2rem' }}>
          I typically respond within 24 hours. Looking forward to connecting with you!
        </p>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
