import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
      grid-gap: 30px;
    }

    @media (max-width: 480px) {
      grid-gap: 20px;
    }
  }
`;
const StyledText = styled.div`
  p {
    font-size: clamp(16px, 2vw, 18px);
    line-height: 1.6;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: clamp(14px, 2.5vw, 16px);
    }

    @media (max-width: 480px) {
      font-size: clamp(13px, 2.2vw, 15px);
    }
  }

  h4 {
    font-size: clamp(18px, 2.5vw, 20px);
    margin-bottom: 1rem;

    @media (max-width: 480px) {
      font-size: clamp(16px, 2.2vw, 18px);
    }
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-gap: 0;
    }

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-xs), 1.5vw, var(--fz-sm));

      @media (max-width: 480px) {
        font-size: var(--fz-xs);
        padding-left: 15px;
        margin-bottom: 8px;
      }

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--pink);
        font-size: var(--fz-sm);
        line-height: 12px;

        @media (max-width: 480px) {
          font-size: var(--fz-xs);
        }
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 40px auto 0;
    width: 60%;
    max-width: 250px;
  }

  @media (max-width: 480px) {
    margin: 30px auto 0;
    width: 70%;
    max-width: 200px;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--pink);

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--pink);
      top: 20px;
      left: 20px;
      z-index: -1;

      @media (max-width: 480px) {
        top: 15px;
        left: 15px;
        border-width: 1px;
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Java & Spring Boot',
    'Python & Django',
    'JavaScript (ES6+)',
    'TypeScript',
    'React & Angular',
    'Node.js & Express',
    'AWS & Cloud Services',
    'Kubernetes & Docker',
    'Kafka & Message Queues',
    'PostgreSQL & MongoDB',
    'Machine Learning',
    'CI/CD & DevOps',
  ];


  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I'm a developer passionate about crafting accessible, scalable applications that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability.
            </p>

            <p>
              Currently, I'm a <strong>Software Engineer at JPMorgan Chase</strong>, specializing in full-stack development and cloud architecture. I contribute to the creation and maintenance of critical systems that power financial services, ensuring our platform meets high performance standards and best practices to deliver exceptional user experiences.
            </p>

            <p>
              In the past, I've had the opportunity to develop software across a variety of settings — from health-tech startups to large financial corporations. Additionally, I also work on personal projects and contribute to open-source communities, sharing knowledge and learning from fellow developers.
            </p>

            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to
              open-source projects, writing technical blogs, or mentoring the next generation of
              developers. I believe in continuous learning and sharing knowledge with the community.
            </p>

            <p>Here are the technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/varshini2.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP']}
              alt="Varshini Challagundla - Software Engineer"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
