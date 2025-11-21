import React from 'react';
import { CAREER_OPENINGS } from '../constants';

const CareersPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">Join Our Team</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            Help us build the future of finance. We're looking for passionate innovators to join our mission.
          </p>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          {CAREER_OPENINGS.length > 0 ? (
            <ul className="space-y-4">
              {CAREER_OPENINGS.map((job, index) => (
                <li key={index} className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 flex items-center justify-between hover:border-indigo-500 transition-colors">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                    <p className="text-slate-400">{job.department} &middot; {job.location}</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                    Apply Now
                  </button>
                </li>
              ))}
            </ul>
          ) : (
             <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700 text-center">
                <h3 className="text-xl font-bold text-white">No Current Openings</h3>
                <p className="mt-4 text-slate-400">
                    Thank you for your interest in a career at Apex Financials. We are not actively hiring for any positions at this time. We encourage you to check back later or follow us on professional networks for future opportunities.
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareersPage;