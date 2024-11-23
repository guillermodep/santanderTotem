import React, { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  icon: ReactNode;
  description: string;
}

function ServiceCard({ title, icon, description }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
        Más información →
      </button>
    </div>
  );
}

export default ServiceCard;