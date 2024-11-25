import React from 'react';
import { MapPin, Clock, Star } from 'lucide-react';
import { Experience } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience }: Props) {
  return (
    <Link to={`/experience/${experience.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
        <div className="relative h-48 w-full">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-indigo-600">
            ${experience.price}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{experience.title}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {experience.location}
          </div>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <Clock className="h-4 w-4 mr-1" />
            {experience.duration}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
            {experience.rating} / 5.0
          </div>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{experience.description}</p>
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
}