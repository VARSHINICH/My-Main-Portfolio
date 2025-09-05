import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledTestimonialsSection = styled.section`
  max-width: 900px;

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .testimonial {
    background: var(--light-navy);
    padding: 2rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--pink-tint);
    transition: var(--transition);

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-pink);
    }

    .quote {
      font-style: italic;
      margin-bottom: 1rem;
      color: var(--light-slate);
      line-height: 1.6;
    }

    .author {
      display: flex;
      align-items: center;
      gap: 1rem;

      .author-info {
        h4 {
          color: var(--pink);
          margin: 0;
          font-size: var(--fz-sm);
        }

        p {
          color: var(--slate);
          margin: 0;
          font-size: var(--fz-xs);
        }
      }
    }
  }
`;

const Testimonials = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const testimonials = [
    {
      quote:
        'Varshini is an exceptional developer who consistently delivers high-quality solutions. Her expertise in cloud architecture and problem-solving skills are outstanding.',
      author: 'Senior Engineering Manager',
      company: 'JPMorgan Chase',
    },
    {
      quote:
        'Working with Varshini was a pleasure. She brings innovative ideas to the table and has a deep understanding of modern web technologies.',
      author: 'Product Manager',
      company: 'DocBot Plus',
    },
    {
      quote:
        'Varshini\'s technical skills and leadership qualities make her a valuable team member. She\'s always willing to help and mentor others.',
      author: 'Software Engineer',
      company: 'JPMorgan Chase',
    },
  ];

  return (
    <StyledTestimonialsSection id="testimonials" ref={revealContainer}>
      <h2 className="numbered-heading">What People Say</h2>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="testimonial">
            <p className="quote">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="author">
              <div className="author-info">
                <h4>{testimonial.author}</h4>
                <p>{testimonial.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StyledTestimonialsSection>
  );
};

export default Testimonials;
