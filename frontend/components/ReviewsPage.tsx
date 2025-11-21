import React from 'react';
import { MOCK_REVIEWS } from '../constants';
import { Review } from '../types';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const Rating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < rating} />
        ))}
    </div>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
        <div className="flex items-center mb-4">
            <img className="w-16 h-16 rounded-full mr-4 ring-2 ring-slate-700" src={review.avatar} alt={review.name} />
            <div>
                <h3 className="text-lg font-bold text-white">{review.name}</h3>
                <p className="text-sm text-indigo-400">{review.title}</p>
            </div>
        </div>
        <div className="mb-4">
            <Rating rating={review.rating} />
        </div>
        <p className="text-slate-300 text-base leading-relaxed flex-grow">"{review.reviewText}"</p>
    </div>
);


const ReviewsPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">Valued by the Visionaries</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            Hear from the industry leaders and financial experts who trust Apex Financials to drive their success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {MOCK_REVIEWS.map((review, index) => (
                <ReviewCard key={index} review={review} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;