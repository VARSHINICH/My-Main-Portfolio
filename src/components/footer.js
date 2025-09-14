import React from 'react';
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

const Footer = () => {

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

    </StyledFooter>
  );
};

export default Footer;
