import React from 'react';
import { Hero } from '../components/sections/Hero/Hero';
import { Problem } from '../components/sections/Problem/Problem';
import { Solution } from '../components/sections/Solution/Solution';
import { HowItHelps } from '../components/sections/HowItHelps/HowItHelps';
import { Testimonials } from '../components/sections/Testimonials/Testimonials';
import { Pricing } from '../components/sections/Pricing/Pricing';
import { CTAFooter } from '../components/sections/CTAFooter/CTAFooter';

const sections = [Hero, Problem, Solution, HowItHelps, Testimonials, Pricing, CTAFooter] as const;

export const Home: React.FC = () => {
  return (
    <main id="main-content">
      {sections.map((Section, i) => <Section key={i} />)}
    </main>
  );
};
