import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React, { useEffect } from "react";

const AboutUs = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <Header />

      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section  className="bg-[#1A4D2E] text-white py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">About Us</h1>
            <p className="text-xl md:text-2xl font-light italic text-accent/90">
              "A Taste Worth Traveling For"
            </p>
          </div>
        </section>

        {/* --- Intro Section --- */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-[#1A4D2E] mb-6">
                  At K B S TRADERS, we believe that true luxury lies in purity, provenance, and care.
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                  <p>
                    Our journey began with a deep appreciation for fine foods — the kind that carry stories of distant lands, skilled farmers, and time-honored traditions.
                  </p>
                  <p>
                    What started as a passion for premium dates, nuts, and dry fruits slowly transformed into a commitment: to bring the world’s finest edible treasures to discerning customers, without compromise.
                  </p>
                  <p>
                    Today, K B S TRADERS stands as a trusted destination for premium dates, handpicked nuts, exotic dry fruits, gourmet chocolates, and thoughtfully curated gift hampers.
                  </p>
                </div>
              </div>
              <div className="bg-[#1A4D2E]/5 p-8 rounded-2xl border border-[#1A4D2E]/10">
                 <p className="text-[#1A4D2E] font-medium text-lg italic">
                   "Each product is selected with intention, sourced from reputed global producers and trusted Indian partners, and delivered with the utmost care."
                 </p>
                 <div className="mt-6 h-1 w-20 bg-accent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- What Defines Our Craft (Grid Cards) --- */}
        <section className="py-16 bg-gray-50 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center text-[#1A4D2E] mb-12">What Defines Our Craft</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Global Sourcing", desc: "India, Middle East (GCC), Europe, and Asia." },
                { title: "Strict Quality", desc: "Visual inspection, freshness checks, and hygienic packing." },
                { title: "Elegant Packaging", desc: "Designed for gifting and premium experiences." },
                { title: "Reliable Delivery", desc: "Ensuring peak freshness at your doorstep." }
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-[#1A4D2E] hover:shadow-md transition-shadow text-center">
                  <h3 className="font-bold text-[#1A4D2E] mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Mission & Vision --- */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-[#1A4D2E] text-white text-sm tracking-widest uppercase rounded-full">Our Mission</div>
              <h3 className="text-2xl font-serif font-bold text-[#1A4D2E]">Delivering Global Quality with Local Care</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3 items-start">
                  <span className="text-[#1A4D2E] font-bold">✓</span>
                  Source the finest dates, nuts, dry fruits, chocolates, and spices.
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1A4D2E] font-bold">✓</span>
                  Maintain uncompromising standards in quality and hygiene.
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1A4D2E] font-bold">✓</span>
                  Build lasting customer relationships through honesty and transparency.
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-accent text-[#1A4D2E] text-sm tracking-widest uppercase rounded-full">Our Vision</div>
              <h3 className="text-2xl font-serif font-bold text-[#1A4D2E]">Redefining Premium Healthy Living</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3 items-start">
                  <span className="text-[#1A4D2E] font-bold">→</span>
                  Become a preferred name for premium dry fruits across India, GCC, and Europe.
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1A4D2E] font-bold">→</span>
                  Encourage healthier lifestyles through natural food choices.
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1A4D2E] font-bold">→</span>
                  Blend traditional sourcing wisdom with modern distribution.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Final Promise --- */}
        <section className="py-20 bg-[#1A4D2E] text-white px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif mb-6">Our Promise to You</h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              Every product you receive from K B S TRADERS carries more than flavor — it carries trust, craftsmanship, and our unwavering commitment to excellence.
            </p>
            <p className="font-serif text-xl text-accent">
              We are honored to be part of your table.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;