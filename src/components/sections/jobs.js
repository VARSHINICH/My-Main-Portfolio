import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
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
    margin-bottom: 50px;
    text-align: left;
    color: var(--lightest-slate);
    
    @media (max-width: 1024px) {
      margin-bottom: 45px;
    }

    @media (max-width: 768px) {
      margin-bottom: 40px;
      text-align: center;
    }

    @media (max-width: 480px) {
      margin-bottom: 35px;
    }
  }

  .experience-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .experience-item {
    margin-bottom: 50px;
    position: relative;
    padding-left: 30px;

    @media (max-width: 768px) {
      margin-bottom: 40px;
      padding-left: 25px;
    }

    @media (max-width: 480px) {
      margin-bottom: 35px;
      padding-left: 20px;
    }

    &:before {
      content: counter(item);
      counter-increment: item;
      position: absolute;
      left: 0;
      top: 0;
      color: var(--pink);
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      font-weight: 400;
    }

    .experience-header {
      margin-bottom: 10px;
    }

    .experience-title {
      font-size: clamp(18px, 2.5vw, 22px);
      font-weight: 600;
      color: var(--lightest-slate);
      margin: 0 0 5px 0;
      line-height: 1.3;

      @media (max-width: 768px) {
        font-size: clamp(16px, 2.2vw, 20px);
      }

      @media (max-width: 480px) {
        font-size: clamp(15px, 2vw, 18px);
      }
    }

    .experience-company {
      color: var(--pink);
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      margin: 0 0 20px 0;

      @media (max-width: 768px) {
        font-size: var(--fz-xs);
        margin-bottom: 15px;
      }
    }

    .experience-description {
      color: var(--slate);
      font-size: clamp(15px, 1.8vw, 17px);
      line-height: 1.6;
      margin: 0 0 20px 0;

      @media (max-width: 768px) {
        font-size: clamp(14px, 1.6vw, 16px);
        margin-bottom: 15px;
      }

      @media (max-width: 480px) {
        font-size: clamp(13px, 1.4vw, 15px);
      }
    }

    .experience-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 15px;

      @media (max-width: 768px) {
        gap: 6px;
        margin-top: 12px;
      }

      .tech-tag {
        background-color: var(--light-navy);
        color: var(--pink);
        padding: 4px 8px;
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        font-weight: 500;
        transition: var(--transition);

        &:hover {
          background-color: var(--pink);
          color: var(--dark-navy);
        }

        @media (max-width: 480px) {
          font-size: 11px;
          padding: 3px 6px;
        }
      }
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 1024px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    width: 180px;
  }

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  @media (max-width: 360px) {
    width: calc(100% + 30px);
    padding-left: 15px;
    margin-left: -15px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--pink)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 1024px) {
    padding: 0 18px 2px;
    font-size: clamp(12px, 1.5vw, 13px);
  }

  @media (max-width: 768px) {
    padding: 0 15px 2px;
    font-size: clamp(11px, 1.4vw, 12px);
  }

  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
    font-size: clamp(11px, 1.3vw, 12px);
  }

  @media (max-width: 480px) {
    min-width: 100px;
    padding: 0 12px;
    font-size: clamp(10px, 1.2vw, 11px);
  }

  @media (max-width: 360px) {
    min-width: 90px;
    padding: 0 10px;
    font-size: clamp(9px, 1.1vw, 10px);
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--pink);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));

    &:first-of-type {
      margin-left: 50px;
    }
    &:last-of-type {
      margin-left: 25px;
    }
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--lightest-slate);
      
      a {
        color: inherit;
        text-decoration: none;
        transition: var(--transition);
        
        &:hover,
        &:focus {
          color: var(--pink);
        }
      }
      
      @media (max-width: 768px) {
        color: var(--white);
      }
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .technologies {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tech-tag {
      background-color: var(--light-navy);
      color: var(--pink);
      padding: 4px 8px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      font-weight: 500;
      transition: var(--transition);

      &:hover {
        background-color: var(--pink);
        color: var(--dark-navy);
      }
    }
  }
`;

const Jobs = () => {
  const jobsData = [
    {
      company: 'JPMorgan Chase & Co.',
      position: 'Software Engineer',
      location: 'New York, NY',
      range: 'June 2023 — Present',
      url: 'https://www.jpmorgan.com/',
      description: [
        'Build and maintain critical components used to construct JPMorgan Chase\'s financial systems, across the whole product',
        'Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in scalable architecture',
        'Developed real-time notification services using Kafka, handling 1M+ messages per day',
        'Designed low-latency data pipelines reducing processing time by 40%',
        'Led migration of legacy systems to cloud-native architecture on AWS',
        'Mentored 5+ junior developers and conducted 50+ technical interviews',
      ],
      technologies: ['Java', 'Spring Boot', 'Kafka', 'AWS', 'Kubernetes', 'PostgreSQL'],
    },
    {
      company: 'JPMorgan Chase & Co.',
      position: 'Software Engineer Intern',
      location: 'New York, NY',
      range: 'Feb 2023 — May 2023',
      url: 'https://www.jpmorgan.com/',
      description: [
        'Completed intensive 4-month internship program in software engineering',
        'Worked on critical financial systems and gained hands-on experience with enterprise-scale applications',
        'Collaborated with senior engineers on real-world projects impacting millions of users',
        'Developed skills in Java, Spring Boot, and cloud technologies',
        'Participated in code reviews and agile development processes',
        'Successfully transitioned to full-time Software Engineer role upon completion',
      ],
      technologies: ['Java', 'Spring Boot', 'AWS', 'Docker', 'Git'],
    },
    {
      company: 'DocBot Plus',
      position: 'Software Engineer Intern',
      location: 'Remote',
      range: '2021 — 2022',
      url: 'https://www.linkedin.com/company/docbotplus/',
      description: [
        'Built, styled, and shipped high-quality health-tech platform, mobile apps, and digital experiences for patient care',
        'Developed AI-powered chatbot for patient consultation and symptom analysis using React, Node.js, and MongoDB',
        'Implemented real-time video consultation features with WebRTC',
        'Created automated appointment scheduling and reminder systems',
        'Integrated with multiple healthcare APIs for seamless data exchange',
        'Deployed applications on AWS with CI/CD pipeline for continuous delivery',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'WebRTC', 'Express', 'Twilio', 'Redis'],
    },
  ];

  const [activeTabId, setActiveTabId] = useState(0);
  const revealContainer = useRef(null);
  const revealJobs = useRef([]);
  const tabs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
    revealJobs.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setActiveTabId(prev => (prev + 1) % jobsData.length);
        break;
      }
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setActiveTabId(prev => (prev - 1 + jobsData.length) % jobsData.length);
        break;
      }
      default:
        break;
    }
  };

  const focusTab = () => {
    if (tabs.current[activeTabId]) {
      tabs.current[activeTabId].focus();
    }
  };

  useEffect(() => focusTab(), [activeTabId]);

  return (
    <StyledJobsSection id="jobs" ref={revealContainer} style={{ counterReset: 'item' }}>
      <h2>Experience</h2>

      <ol className="experience-list">
        {jobsData.map((job, i) => (
          <li key={i} className="experience-item" ref={el => (revealJobs.current[i] = el)}>
            <div className="experience-header">
              <h3 className="experience-title">
                {job.position} · {job.company}
              </h3>
              <p className="experience-company">{job.range}</p>
            </div>
            
            <p className="experience-description">
              {job.description.join(' ')}
            </p>

            {job.technologies && (
              <div className="experience-tech">
                {job.technologies.map((tech, k) => (
                  <span key={k} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </StyledJobsSection>
  );
};

export default Jobs;
