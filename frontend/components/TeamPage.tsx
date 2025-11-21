import React from 'react';
import { TEAM_MEMBERS } from '../constants';

const TeamPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">Our Leadership</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            The architects of next-generation investment intelligence.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 text-center flex flex-col items-center">
              <img className="w-24 h-24 rounded-full mx-auto" src={member.avatar} alt={member.name} />
              <h3 className="mt-4 text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-indigo-400">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;