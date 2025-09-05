import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    min-height: 60px;
  }
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  @media (max-width: 480px) {
    max-width: 250px;
    margin: 0 auto 8px;
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      transition: var(--transition);

      @media (max-width: 480px) {
        padding: 8px;
      }

      &:hover {
        transform: translateY(-2px);
        color: var(--pink);
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
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: clamp(var(--fz-xxs), 1.2vw, var(--fz-xs));
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: var(--fz-xxs);
    line-height: 1.1;
  }

  a {
    padding: 10px;
    transition: var(--transition);

    @media (max-width: 480px) {
      padding: 8px;
    }

    &:hover {
      color: var(--pink);
    }
  }

  .github-stats {
    margin-top: 10px;

    @media (max-width: 480px) {
      margin-top: 8px;
    }

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;

      @media (max-width: 480px) {
        margin: 0 5px;
      }

      svg {
        display: inline-block;
        margin-right: 5px;
        width: 14px;
        height: 14px;

        @media (max-width: 480px) {
          width: 12px;
          height: 12px;
          margin-right: 3px;
        }
      }
    }
  }
`;

const Footer = () => {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch('https://api.github.com/repos/bchiang7/v4')
      .then(response => response.json())
      .then(json => {
        const { stargazers_count, forks_count } = json;
        setGitHubInfo({
          stars: stargazers_count,
          forks: forks_count,
        });
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit tabindex="-1">
        <a href="https://github.com/VARSHINICH">
          <div>Designed &amp; Built by Varshini Challagundla</div>

          {githubInfo.stars && githubInfo.forks && (
            <div className="github-stats">
              <span>
                <Icon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span>
                <Icon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>
              </span>
            </div>
          )}
        </a>
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
