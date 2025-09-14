import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledTechnologiesSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;

  @media (max-width: 1024px) {
    padding: 90px 20px;
    max-width: 1000px;
  }

  @media (max-width: 768px) {
    padding: 80px 20px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 60px 15px;
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

  .technologies-intro {
    text-align: center;
    margin-bottom: 60px;
    
    p {
      font-size: clamp(16px, 2vw, 18px);
      line-height: 1.6;
      color: var(--light-slate);
      max-width: 600px;
      margin: 0 auto;

      @media (max-width: 768px) {
        font-size: clamp(14px, 2.5vw, 16px);
      }

      @media (max-width: 480px) {
        font-size: clamp(13px, 2.2vw, 15px);
      }
    }
  }

  .skills-container {
    margin-top: 50px;

    @media (max-width: 768px) {
      margin-top: 40px;
    }

    @media (max-width: 480px) {
      margin-top: 30px;
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    max-width: 1000px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 18px;
    }
  }

  .skill-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      transform: translateX(5px);
    }

    @media (max-width: 768px) {
      padding: 18px 0;
      gap: 12px;
    }

    @media (max-width: 480px) {
      padding: 15px 0;
      gap: 10px;
    }

      .skill-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        overflow: hidden;
        background: white;
        padding: 4px;

        @media (max-width: 768px) {
          width: 36px;
          height: 36px;
        }

        @media (max-width: 480px) {
          width: 32px;
          height: 32px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 4px;
        }
      }

      .skill-content {
        flex: 1;
        min-width: 0;

        .skill-name {
          font-size: clamp(14px, 1.8vw, 16px);
          color: var(--lightest-slate);
          font-weight: 500;
          margin-bottom: 6px;

          @media (max-width: 768px) {
            font-size: clamp(13px, 1.6vw, 15px);
            margin-bottom: 4px;
          }

          @media (max-width: 480px) {
            font-size: clamp(12px, 1.5vw, 14px);
            margin-bottom: 3px;
          }
        }

        .progress-container {
          display: flex;
          align-items: center;
          gap: 8px;

          .progress-bar {
            flex: 1;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;

            @media (max-width: 480px) {
              height: 5px;
            }

            .progress-fill {
              height: 100%;
              background: linear-gradient(90deg, var(--pink), #ff8a80);
              border-radius: 3px;
              transition: width 1.5s ease-in-out;
              position: relative;

              &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                animation: shimmer 2s infinite;
              }
            }
          }

          .skill-percentage {
            font-size: clamp(12px, 1.5vw, 14px);
            color: var(--pink);
            font-weight: 600;
            font-family: var(--font-mono);
            min-width: 35px;
            text-align: right;

            @media (max-width: 768px) {
              font-size: clamp(11px, 1.4vw, 13px);
              min-width: 30px;
            }

            @media (max-width: 480px) {
              font-size: clamp(10px, 1.3vw, 12px);
              min-width: 28px;
            }
          }
        }
      }
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const Technologies = () => {
  const skills = [
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', percentage: 85 },
    { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', percentage: 80 },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', percentage: 75 },
    { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', percentage: 70 },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', percentage: 85 },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', percentage: 75 },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', percentage: 80 },
    { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg', percentage: 70 },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', percentage: 75 },
    { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', percentage: 70 },
    { name: 'AWS', logo: '/images/aws-logo.png', percentage: 80 },
    { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg', percentage: 75 },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', percentage: 80 },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', percentage: 75 },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', percentage: 70 },
    { name: 'Kafka', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', percentage: 70 },
    { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', percentage: 75 },
    { name: 'Twilio', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twilio/twilio-original.svg', percentage: 70 },
    { name: 'Machine Learning', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', percentage: 75 },
    { name: 'CI/CD', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', percentage: 70 },
    { name: 'DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', percentage: 75 }
  ];

  const revealTitle = useRef(null);
  const revealIntro = useRef(null);
  const revealSkills = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealIntro.current, srConfig(100));
    sr.reveal(revealSkills.current, srConfig(200));
  }, []);

  return (
    <StyledTechnologiesSection id="technologies">
      <h2 ref={revealTitle}>Skills & Technologies</h2>
      
      <div className="technologies-intro" ref={revealIntro}>
        <p>Here are the technologies I've been working with recently:</p>
      </div>

      <div className="skills-container" ref={revealSkills}>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <div key={i} className="skill-item">
              <div className="skill-icon">
                <img src={skill.logo} alt={`${skill.name} logo`} />
              </div>
              <div className="skill-content">
                <div className="skill-name">{skill.name}</div>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                  <div className="skill-percentage">{skill.percentage}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledTechnologiesSection>
  );
};

export default Technologies;