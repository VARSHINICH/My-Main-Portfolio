import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import awsLogo from '../../images/aws-logo.png';
import gcpLogo from '../../images/gcp-logo.png';
import terraformLogo from '../../images/terraform-logo.png';
import certificateIcon from '../../images/certificate-icon.png';

const StyledCertificationsSection = styled.section`
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

  .certifications-intro {
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

  .certifications-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
    margin-top: 50px;
    justify-items: center;
    align-items: start;

    @media (max-width: 1024px) {
      gap: 50px;
      margin-top: 45px;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      margin-top: 40px;
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 50px;
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
      margin-top: 30px;
    }

    @media (max-width: 360px) {
      grid-template-columns: 1fr;
      gap: 30px;
      margin-top: 25px;
    }
  }

  .certification-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);

      .certification-logo {
        transform: scale(1.1);
        color: var(--pink);
      }
    }

    .certification-logo {
      margin-bottom: 15px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 1024px) {
        margin-bottom: 14px;
      }

      @media (max-width: 768px) {
        margin-bottom: 12px;
      }

      @media (max-width: 480px) {
        margin-bottom: 10px;
      }

      @media (max-width: 360px) {
        margin-bottom: 8px;
      }

      .gatsby-image-wrapper {
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          object-fit: contain !important;
          max-width: 100%;
          max-height: 100%;
        }

        @media (max-width: 1024px) {
          width: 110px;
          height: 110px;
        }

        @media (max-width: 768px) {
          width: 100px;
          height: 100px;
        }

        @media (max-width: 480px) {
          width: 90px;
          height: 90px;
        }

        @media (max-width: 360px) {
          width: 80px;
          height: 80px;
        }
      }
    }

    .certification-title {
      color: var(--light-slate);
      font-size: clamp(12px, 1.5vw, 14px);
      font-weight: 500;
      margin: 0;
      line-height: 1.3;
      text-align: center;

      @media (max-width: 480px) {
        font-size: 11px;
      }
    }

    .certification-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;

      &:hover {
        text-decoration: none;
        color: inherit;
      }
    }
  }
`;

const Certifications = () => {
  const data = useStaticQuery(graphql`
    query {
      certifications: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { isCertification: { eq: true } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              date
            }
            html
          }
        }
      }
    }
  `);

  const revealTitle = useRef(null);
  const revealIntro = useRef(null);
  const revealCertifications = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealIntro.current, srConfig(100));
    revealCertifications.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100 + 200)));
  }, []);

  const certifications = data.certifications.edges.filter(({ node }) => node);

  const getCertificationImage = title => {
    if (title.toLowerCase().includes('aws')) {
      return (
        <img
          src={awsLogo}
          alt="AWS Logo"
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
          }}
        />
      );
    }
    if (title.toLowerCase().includes('google') || title.toLowerCase().includes('data analytics')) {
      return (
        <img
          src={gcpLogo}
          alt="GCP Logo"
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
          }}
        />
      );
    }
    if (title.toLowerCase().includes('terraform') || title.toLowerCase().includes('hashicorp')) {
      return (
        <img
          src={terraformLogo}
          alt="Terraform Logo"
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
          }}
        />
      );
    }
    return (
      <img
        src={certificateIcon}
        alt="Certificate Icon"
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto',
        }}
      />
    );
  };

  return (
    <StyledCertificationsSection id="certifications">
      <h2 ref={revealTitle}>Certifications</h2>

      <div className="certifications-intro" ref={revealIntro}></div>

      <div className="certifications-grid">
        {certifications.map(({ node }, i) => {
          const { frontmatter } = node;
          const { title, external } = frontmatter;

          return (
            <div
              key={i}
              className="certification-item"
              ref={el => (revealCertifications.current[i] = el)}>
              {external ? (
                <a href={external} target="_blank" rel="noreferrer" className="certification-link">
                  <div className="certification-logo">{getCertificationImage(title)}</div>
                  <h3 className="certification-title">{title}</h3>
                </a>
              ) : (
                <>
                  <div className="certification-logo">{getCertificationImage(title)}</div>
                  <h3 className="certification-title">{title}</h3>
                </>
              )}
            </div>
          );
        })}
      </div>
    </StyledCertificationsSection>
  );
};

export default Certifications;
