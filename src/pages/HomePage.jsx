import React from 'react';

import Hero from '../components/Hero/Hero';
import PageMeta from '../components/PageMeta/PageMeta';
const HomePage = () => (
  <>
    <PageMeta
      title="TravelTrucks | Home"
      description="Rent a camper and travel freely"
    />
    <Hero />
  </>
);

export default HomePage;
