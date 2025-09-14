import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 1024px) {
    grid-gap: 15px;
  }

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-gap: 20px;
  }

  @media (max-width: 480px) {
    grid-gap: 15px;
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 1024px) {
      margin-bottom: 80px;
    }

    @media (max-width: 768px) {
      margin-bottom: 60px;
    }

    @media (max-width: 480px) {
      margin-bottom: 40px;
    }

    @media (max-width: 360px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1200px) {
        grid-column: 6 / -1;
      }

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }

      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 30px 25px 20px;
        text-align: left;
      }

      @media (max-width: 480px) {
        padding: 25px 20px 15px;
      }

      @media (max-width: 360px) {
        padding: 20px 15px 10px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;
    z-index: 2;

    @media (max-width: 1200px) {
      grid-column: 1 / 8;
    }

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 30px 25px 20px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 25px 20px 15px;
    }

    @media (max-width: 360px) {
      padding: 20px 15px 10px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(28px, 6vw, 32px);
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 20px;
    text-decoration: none;

    @media (min-width: 1200px) {
      margin: 0 0 25px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
      margin: 0 0 22px;
    }

    @media (max-width: 768px) {
      color: var(--white);
      font-size: clamp(24px, 5vw, 28px);
      margin: 0 0 18px;
    }

    @media (max-width: 480px) {
      font-size: clamp(22px, 4.5vw, 26px);
      margin: 0 0 15px;
    }

    @media (max-width: 360px) {
      font-size: clamp(20px, 4vw, 24px);
      margin: 0 0 12px;
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
      pointer-events: none;
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--pink);
      border-radius: var(--border-radius);
      vertical-align: middle;

      @media (max-width: 768px) {
        pointer-events: none;
        cursor: default;
      }

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before {
          background: transparent;
        }

        @media (max-width: 768px) {
          background-color: var(--pink);
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;

        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    .img {
      border-radius: var(--border-radius);
      transition: var(--transition);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
      }
    }
  }
`;

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
              date
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
            html
          }
        }
      }
    }
  `);

  const projects = data.projects.edges.filter(({ node }) => node);
  const initialProjects = projects.slice(0, 3);
  const remainingProjects = projects.slice(3);
  const displayedProjects = showAll ? projects : initialProjects;

  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const revealButton = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
    if (revealButton.current) {
      sr.reveal(revealButton.current, srConfig(300));
    }
  }, [showAll]);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I've Built
      </h2>

      <StyledProjectsGrid>
        {displayedProjects &&
          displayedProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover } = frontmatter;
            const image = cover ? getImage(cover) : null;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">{title}</h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech && tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {image && (
                  <div className="project-image">
                    <a
                      href={external ? external : github ? github : '#'}
                      onClick={e => {
                        // Prevent clicks on mobile devices
                        if (window.innerWidth <= 768) {
                          e.preventDefault();
                          return false;
                        }
                      }}>
                      <GatsbyImage image={image} alt={title} className="img" />
                    </a>
                  </div>
                )}
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>

      {remainingProjects.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <button
            ref={revealButton}
            onClick={() => setShowAll(!showAll)}
            style={{
              background: 'transparent',
              border: '2px solid var(--pink)',
              color: 'var(--pink)',
              padding: '12px 30px',
              borderRadius: '50px',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'var(--pink)';
              e.target.style.color = 'var(--dark-navy)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--pink)';
              e.target.style.transform = 'translateY(0)';
            }}>
            {showAll ? 'Show Less' : `Show More (${remainingProjects.length})`}
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
