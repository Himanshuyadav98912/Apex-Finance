import React from 'react';
import { TEAM_MEMBERS } from '../constants';

const Section: React.FC<{id: string, className?: string, children: React.ReactNode}> = ({id, className, children}) => (
    <section id={id} className={`py-20 sm:py-24 lg:py-32 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    </section>
);

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center mx-auto md:text-left md:mx-0">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Architecting Tomorrow's</span>
              <span className="block text-yellow-400">Financial Intelligence</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-lg text-slate-200 drop-shadow-md md:mx-0 sm:text-xl md:mt-8 md:max-w-xl">
              Apex Financials merges deep market expertise with pioneering AI to deliver an unparalleled analytical edge. We provide strategic, data-driven solutions that empower India's leading financial institutions to navigate complexity with confidence and precision.
            </p>
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <button
                onClick={() => onNavigate('login')}
                className="inline-block px-8 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all duration-300"
              >
                Access Portal
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="inline-block px-8 py-3 font-semibold text-white bg-slate-700/50 border border-slate-600 rounded-lg shadow-lg hover:bg-slate-700 transition-all duration-300"
              >
                Explore Our Firm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Section id="team" className="bg-slate-800/20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">Leadership at Apex Financials</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            Meet the strategists and innovators steering our firm towards a new horizon in finance.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="p-6 bg-slate-800 rounded-2xl border border-slate-700 text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
              <img className="w-28 h-28 rounded-full mx-auto ring-4 ring-slate-700" src={member.avatar} alt={member.name} />
              <h3 className="mt-5 text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-indigo-400">{member.title}</p>
              <p className="mt-4 text-sm text-slate-400 flex-grow">{member.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Careers Section */}
      <Section id="careers">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">Build the Future with Us</h2>
            <p className="mt-4 text-lg text-slate-300">
                We are always looking for exceptional talent to join our mission. While we may not have specific openings at this moment, we believe in connecting with brilliant minds who can shape the future of finance.
            </p>
             <div className="mt-8 p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-white">No Current Openings</h3>
                <p className="mt-4 text-slate-400">
                    Thank you for your interest in a career at Apex Financials. We are not actively hiring for any positions at this time. We encourage you to check back later or follow us on professional networks for future opportunities.
                </p>
            </div>
        </div>
      </Section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <p className="text-sm text-slate-400 italic max-w-4xl mx-auto">
            <span className="font-bold text-red-500 not-italic">Disclaimer:</span> Returns are subject to market risk. All investment-related information provided on this platform is for informational purposes only and should not be construed as financial advice. Past performance is not indicative of future results. Please consult with a qualified financial advisor and read all scheme-related documents carefully before making any investment decisions.
        </p>
      </div>
    </>
  );
};

export default HomePage;