import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--pink);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
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

  const achievements = [
    'Built real-time notification services handling 1M+ messages/day at JPMorgan Chase',
    'Designed low-latency data pipelines reducing processing time by 40%',
    'Led migration of legacy systems to cloud-native architecture',
    'Mentored 5+ junior developers and conducted 50+ technical interviews',
    'Contributed to open-source projects with 500+ GitHub stars',
    'Delivered 15+ production-ready applications with 99.9% uptime',
  ];

  const certifications = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional Developer',
    'Certified Kubernetes Administrator',
    'Oracle Java SE 11 Developer',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! I'm <strong>Varshini Challagundla</strong>, a passionate software engineer who
              loves building things that make a difference. My journey in technology started back in
              2015 when I began customizing website themes—little did I know, this would spark a
              lifelong passion for coding, problem-solving, and creating powerful applications.
            </p>

            <p>
              Today, I'm proud to be a <strong>Software Engineer at JPMorgan Chase</strong>, one of
              the world's leading financial institutions. I've had the privilege of working on
              mission-critical systems that serve millions of customers, from designing low-latency
              data pipelines to building real-time notification services using cutting-edge
              technologies like Kafka, AWS, and microservices architecture.
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

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: 'var(--pink)', marginBottom: '1rem' }}>Key Achievements:</h4>
            <ul className="skills-list">
              {achievements &&
                achievements.map((achievement, i) => (
                  <li key={i} style={{ fontSize: 'var(--fz-sm)', lineHeight: '1.6' }}>
                    {achievement}
                  </li>
                ))}
            </ul>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: 'var(--pink)', marginBottom: '1rem' }}>Certifications:</h4>
            <ul className="skills-list">
              {certifications &&
                certifications.map((cert, i) => (
                  <li key={i} style={{ fontSize: 'var(--fz-sm)', lineHeight: '1.6' }}>
                    {cert}
                  </li>
                ))}
            </ul>
          </div>
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
