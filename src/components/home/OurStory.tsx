import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const OurStory = () => {
  return (
   <div className="min-h-screen flex flex-col">
      <Header />
      <section className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A4D2E] mb-6">
          Our Story
        </h1>
        <div className="prose prose-lg text-gray-700">
          <p>
            Welcome to KBS Traders. Our journey started with a simple mission: 
            to bring the finest dry fruits and spices to your doorstep.
          </p>
          
        </div>
      </section>
      <Footer />
      </div>
    
  );
};

export default OurStory;