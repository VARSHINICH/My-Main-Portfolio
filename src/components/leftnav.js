import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navLinks } from '@config';

const StyledTopNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: transparent;
  padding: 0 50px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1200px) {
    padding: 0 40px;
  }

  @media (max-width: 1024px) {
    padding: 0 30px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 60px;
  }

  @media (max-width: 600px) {
    padding: 0 18px;
    height: 58px;
  }

  @media (max-width: 480px) {
    padding: 0 15px;
    height: 55px;
  }

  @media (max-width: 400px) {
    padding: 0 12px;
    height: 52px;
  }

  @media (max-width: 360px) {
    padding: 0 10px;
    height: 50px;
  }
`;

const StyledNavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 1200px) {
    gap: 1.8rem;
  }

  @media (max-width: 1024px) {
    gap: 1.6rem;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(10, 25, 47, 0.98);
    flex-direction: column;
    padding: 20px 0;
    gap: 0;
    transform: ${props => (props.isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    transition: transform 0.3s ease;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 165, 165, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    opacity: ${props => (props.isOpen ? '1' : '0')};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  }

  @media (max-width: 480px) {
    top: 55px;
    padding: 15px 0;
  }

  @media (max-width: 360px) {
    top: 50px;
    padding: 10px 0;
  }
`;

const StyledNavItem = styled.a`
  color: ${props => (props.isActive ? 'var(--pink)' : 'var(--light-slate)')};
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  transition: var(--transition);
  cursor: pointer;
  padding: 0.5rem 0.3rem;
  position: relative;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: clamp(12px, 1.4vw, 13px);
    padding: 0.4rem 0.25rem;
  }

  @media (max-width: 768px) {
    font-size: clamp(14px, 1.5vw, 16px);
    padding: 1rem 0;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: none;
    }
  }

  @media (max-width: 480px) {
    font-size: clamp(10px, 1.2vw, 11px);
    padding: 0.25rem 0.15rem;
  }

  @media (max-width: 360px) {
    font-size: clamp(9px, 1.1vw, 10px);
    padding: 0.2rem 0.1rem;
  }

  &:hover {
    color: var(--pink);
    transform: translateY(-1px);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: var(--pink);
    transition: width 0.3s ease;
  }

  &:hover:after,
  &.active:after {
    width: 80%;
  }
`;

const StyledHamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 11;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .hamburger-line {
    width: 25px;
    height: 2px;
    background: var(--light-slate);
    transition: all 0.3s ease;
    transform-origin: center;
    border-radius: 1px;

    &:nth-child(1) {
      transform: ${props => (props.isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none')};
    }

    &:nth-child(2) {
      opacity: ${props => (props.isOpen ? '0' : '1')};
    }

    &:nth-child(3) {
      transform: ${props => (props.isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none')};
    }
  }

  &:hover .hamburger-line {
    background: var(--pink);
  }

  &:focus {
    outline: none;
  }
`;

const StyledBackdrop = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
    opacity: ${props => (props.isOpen ? '1' : '0')};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
`;

const LeftNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'jobs', 'projects', 'articles', 'certifications', 'technologies'];
      const scrollPosition = window.scrollY + 200;

      let currentSection = 'hero';

      // Check if we're at the top of the page
      if (window.scrollY < 100) {
        currentSection = 'hero';
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop } = element;
            if (scrollPosition >= offsetTop) {
              currentSection = section;
            }
          }
        }
      }

      setActiveSection(currentSection);
    };

    const handleClickOutside = event => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);

    if (sectionId === 'hero') {
      // Scroll to top for home
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      <StyledBackdrop isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)} />

      <StyledTopNav>
        <StyledNavList isOpen={isMobileMenuOpen}>
          {navLinks.slice(0, 7).map(({ url, name }, i) => {
            const sectionId = url.replace('/#', '');
            const isActive = activeSection === sectionId;

            return (
              <li key={i}>
                <StyledNavItem
                  isActive={isActive}
                  href={url}
                  onClick={e => {
                    if (url.includes('.pdf')) {
                      // For PDF files, open in new tab
                      window.open(url, '_blank');
                      setIsMobileMenuOpen(false);
                    } else {
                      // For section links, scroll to section
                      handleNavClick(e, sectionId);
                    }
                  }}
                  className={isActive ? 'active' : ''}>
                  {name}
                </StyledNavItem>
              </li>
            );
          })}
        </StyledNavList>

        <StyledHamburger
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </StyledHamburger>
      </StyledTopNav>
    </>
  );
};

LeftNav.propTypes = {
  isHome: PropTypes.bool,
};

export default LeftNav;
