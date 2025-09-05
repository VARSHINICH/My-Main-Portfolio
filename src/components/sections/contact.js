import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
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
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .contact-methods {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  .social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--light-navy);
      color: var(--slate);
      transition: var(--transition);

      &:hover {
        background: var(--pink);
        color: var(--navy);
        transform: translateY(-3px);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .availability {
    margin-top: 2rem;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);

    p {
      margin: 0.5rem 0;
      color: var(--slate);
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
      <h2 className="numbered-heading">What's Next?</h2>

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
