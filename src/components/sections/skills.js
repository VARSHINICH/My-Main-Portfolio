import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledSkillsSection = styled.section`
  max-width: 900px;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.5rem;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .skill-category {
    background: var(--light-navy);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--pink-tint);
    transition: var(--transition);

    @media (max-width: 768px) {
      padding: 1.25rem;
    }

    @media (max-width: 480px) {
      padding: 1rem;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-pink);

      @media (max-width: 768px) {
        transform: translateY(-3px);
      }
    }

    h3 {
      color: var(--pink);
      margin-bottom: 1rem;
      font-size: clamp(var(--fz-md), 2vw, var(--fz-lg));

      @media (max-width: 480px) {
        font-size: var(--fz-md);
        margin-bottom: 0.75rem;
      }
    }

    .skill-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--lightest-navy);
        font-family: var(--font-mono);
        font-size: clamp(var(--fz-xs), 1.5vw, var(--fz-sm));

        @media (max-width: 480px) {
          padding: 0.4rem 0;
          font-size: var(--fz-xs);
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
`;

const Skills = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SASS'],
    },
    {
      title: 'Backend',
      skills: ['Java', 'Python', 'Node.js', 'Spring Boot', 'Express.js', 'REST APIs', 'GraphQL'],
    },
    {
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins', 'Git'],
    },
    {
      title: 'Data & Messaging',
      skills: ['Kafka', 'Redis', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'Apache Spark'],
    },
  ];

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Skills & Technologies</h2>

      <div className="skills-grid">
        {skillCategories.map((category, i) => (
          <div key={i} className="skill-category">
            <h3>{category.title}</h3>
            <ul className="skill-list">
              {category.skills.map((skill, j) => (
                <li key={j}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StyledSkillsSection>
  );
};

export default Skills;
