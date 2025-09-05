import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
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

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
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
      color: var(--pink);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const Jobs = () => {
  const jobsData = [
    {
      company: 'JPMorgan Chase & Co.',
      position: 'Software Engineer',
      location: 'New York, NY',
      range: '2022 - Present',
      url: 'https://www.jpmorgan.com/',
      description: [
        'Developed and maintained mission-critical financial applications serving 50M+ customers',
        'Built real-time notification services using Kafka, handling 1M+ messages per day',
        'Designed low-latency data pipelines reducing processing time by 40%',
        'Led migration of legacy systems to cloud-native architecture on AWS',
        'Mentored 5+ junior developers and conducted 50+ technical interviews',
        'Collaborated with cross-functional teams to deliver 10+ production features',
      ],
      achievements: [
        'Reduced system latency by 40% through optimized data pipeline design',
        'Improved system reliability to 99.9% uptime through robust error handling',
        'Led team of 4 developers in successful cloud migration project',
        'Received "Excellence in Innovation" award for AI-powered fraud detection system',
      ],
    },
    {
      company: 'DocBot Plus',
      position: 'Full-Stack Developer',
      location: 'Remote',
      range: '2021 - 2022',
      url: 'https://www.linkedin.com/company/docbotplus/',
      description: [
        'Built comprehensive health-tech platform using React, Node.js, and MongoDB',
        'Developed AI-powered chatbot for patient consultation and symptom analysis',
        'Implemented real-time video consultation features with WebRTC',
        'Created automated appointment scheduling and reminder systems',
        'Integrated with multiple healthcare APIs for seamless data exchange',
        'Deployed applications on AWS with CI/CD pipeline for continuous delivery',
      ],
      achievements: [
        'Increased user engagement by 60% through improved UI/UX design',
        'Reduced patient wait times by 50% with automated scheduling system',
        'Achieved 95% accuracy in AI-powered symptom analysis',
        'Successfully handled 10K+ concurrent users during peak hours',
      ],
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
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I've Worked</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map((job, i) => (
              <StyledTabButton
                key={i}
                isActive={activeTabId === i}
                onClick={() => setActiveTabId(i)}
                ref={el => (tabs.current[i] = el)}
                id={`tab-${i}`}
                role="tab"
                tabIndex={activeTabId === i ? '0' : '-1'}
                aria-selected={activeTabId === i ? true : false}
                aria-controls={`panel-${i}`}>
                <span>{job.company}</span>
              </StyledTabButton>
            ))}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map((job, i) => (
              <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                <StyledTabPanel
                  id={`panel-${i}`}
                  role="tabpanel"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-labelledby={`tab-${i}`}
                  aria-hidden={activeTabId !== i}
                  hidden={activeTabId !== i}>
                  <h3>
                    <span>{job.position}</span>
                    <span className="company">
                        &nbsp;@&nbsp;
                      <a href={job.url} className="inline-link">
                        {job.company}
                      </a>
                    </span>
                  </h3>

                  <p className="range">{job.range}</p>

                  <div>
                    <ul>
                      {job.description.map((desc, j) => (
                        <li key={j}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </StyledTabPanel>
              </CSSTransition>
            ))}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
