import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-slate-800/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bg-indigo-500 rounded-full -left-20 -top-20 w-96 h-96 mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bg-yellow-500 rounded-full -right-20 -bottom-40 w-96 h-96 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            About Apex Financials
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-300 sm:text-xl">
            We are architects of financial intelligence, engineering the future of investment banking in India through a synthesis of human expertise and artificial intelligence.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Philosophy */}
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Guiding Philosophy</h2>
                <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                    At Apex Financials, we believe the future of finance is not a battle of man versus machine, but a powerful partnership. We combine the irreplaceable intuition and strategic acumen of seasoned investment bankers with the computational prowess of our proprietary ApexAI engine. This dual approach allows us to see what others miss, delivering insights that are not just data-driven, but also context-aware, forward-looking, and strategically sound.
                </p>
            </div>

            {/* Core Services */}
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-white text-center sm:text-4xl">Our Core Services</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-center text-slate-400">
                We provide a comprehensive suite of advisory services tailored to the unique complexities of the Indian market.
              </p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-yellow-400/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-yellow-400">Mergers & Acquisitions</h3>
                  <p className="mt-4 text-slate-400">Strategic advisory for buy-side and sell-side transactions, mergers, and joint ventures, guided by deep industry knowledge and AI-enhanced valuation models.</p>
                </div>
                <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-yellow-400/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-yellow-400">Capital Markets Advisory</h3>
                  <p className="mt-4 text-slate-400">Expert guidance on equity and debt capital raising, including IPOs, FPOs, private placements, and structured finance solutions.</p>
                </div>
                <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-yellow-400/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-yellow-400">Strategic Advisory</h3>
                  <p className="mt-4 text-slate-400">Corporate restructuring, capital structure optimization, and bespoke strategic guidance to help clients navigate critical business challenges.</p>
                </div>
                <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-yellow-400/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-yellow-400">AI-Powered Intelligence</h3>
                  <p className="mt-4 text-slate-400">Our core differentiator. Access to our ApexAI platform for predictive analytics, market sentiment analysis, and opportunity identification.</p>
                </div>
              </div>
            </div>

            {/* The Apex Financials Edge (Mission, Vision, Tech) */}
            <div className="mt-24">
                <h2 className="text-3xl font-bold text-white text-center sm:text-4xl">The Apex Financials Edge</h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
                    <h3 className="text-xl font-bold text-yellow-400">Our Mission</h3>
                    <p className="mt-4 text-slate-400">
                      To empower investment professionals with predictive insights and data-driven tools that redefine the boundaries of financial analysis and strategic decision-making.
                    </p>
                  </div>
                  <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
                    <h3 className="text-xl font-bold text-yellow-400">Our Vision</h3>
                    <p className="mt-4 text-slate-400">
                      To build India's most intelligent and trusted investment banking platform, creating a future where finance is smarter, faster, and more accessible for our clients.
                    </p>
                  </div>
                  <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
                    <h3 className="text-xl font-bold text-yellow-400">Our Technology</h3>
                    <p className="mt-4 text-slate-400">
                      Our proprietary ApexAI engine analyzes billions of data points in real-time, offering clients a decisive edge in a complex and fast-moving market.
                    </p>
                  </div>
                </div>
            </div>

            {/* Commitment to India */}
            <div className="mt-24 bg-slate-800/50 rounded-2xl border border-slate-700">
                <div className="p-12 text-center">
                     <h2 className="text-3xl font-bold text-white sm:text-4xl">Committed to India's Growth</h2>
                     <p className="mt-6 max-w-4xl mx-auto text-slate-300 text-lg leading-relaxed">
                        Our roots are firmly planted in the Indian market. We possess an intricate understanding of its unique regulatory landscape, economic drivers, and cultural nuances. Apex Financials is dedicated to fueling the growth of Indian enterprises, connecting them with capital, and providing the strategic counsel necessary to thrive on both a domestic and global stage. We are more than just a service provider; we are a partner in building a stronger Indian economy.
                     </p>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;