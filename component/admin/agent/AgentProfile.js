import React from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Edit2, 
  Trash2,
  MoreVertical, 
  Home, 
  Calendar, 
  Star, 
  Bed, 
  Bath, 
  Maximize2 
} from 'lucide-react';

export default function AgentProfile({ 
  agent, 
  onBack, 
  onEdit,
  onDelete
}) {
  if (!agent) return null;

//   const defaultProperties = [
//     {
//       id: 'p1',
//       title: 'Modern Villa',
//       location: 'Bahria Town, Lahore',
//       price: '$450,000',
//       tag: 'For Sale',
//       tagColor: 'bg-[#0B5A46]',
//       beds: 4,
//       baths: 3,
//       area: '2,500 sqft',
//       image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=600'
//     },
//     {
//       id: 'p2',
//       title: 'Luxury Apartment',
//       location: 'DHA, Lahore',
//       price: '$1,200 / month',
//       tag: 'For Rent',
//       tagColor: 'bg-[#2563EB]',
//       beds: 3,
//       baths: 2,
//       area: '1,800 sqft',
//       image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600'
//     },
//     {
//       id: 'p3',
//       title: 'Family House',
//       location: 'Johar Town, Lahore',
//       price: '$320,000',
//       tag: 'For Sale',
//       tagColor: 'bg-[#0B5A46]',
//       beds: 4,
//       baths: 3,
//       area: '2,200 sqft',
//       image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600'
//     }
//   ];

 const propertiesList = agent.properties || [];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto font-sans space-y-6">
      
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Agents</span>
        </button>
      </div>

      {/* Main Agent Header Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        
        {/* Left: Avatar + Details */}
        <div className="flex items-center gap-5">
          <img
            src={agent.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt={agent.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-100 shadow-sm shrink-0"
          />
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-[#1A1D20] tracking-tight">
                {agent.name}
              </h1>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100/80 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                {agent.status || 'Active'}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {agent.role || 'Real Estate Agent'}
            </p>

            {/* Contact row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span>{agent.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{agent.phone}</span>
              </div>
              
              {/* Social icons */}
              <div className="flex items-center gap-2 pl-1">
                {agent.facebook && (
                  <a href={agent.facebook} target="_blank" rel="noreferrer" className="text-[#1877F2]">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {agent.instagram && (
                  <a href={agent.instagram} target="_blank" rel="noreferrer" className="text-[#E4405F]">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => onEdit(agent)}
            className="px-4 py-2 bg-[#0B5A46] hover:bg-[#084A39] text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Agent</span>
          </button>
          {onDelete && (
    <button
      type="button"
      onClick={() => {
        onDelete(agent.id);
      }}
      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
    >
      <Trash2 className="w-3.5 h-3.5" />
      <span>Delete</span>
    </button>
  )}
          <button className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* About Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-2">
            About
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">
            {agent.bio || 'Experienced real estate agent with a passion for helping clients find their dream homes. Specializes in residential and commercial properties across the city.'}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-100">
          
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50/70 border border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#0B5A46] shadow-2xs">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[13px] font-bold text-gray-900 block">
                {agent.propertiesCount || 12} Properties
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50/70 border border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-2xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[13px] font-bold text-gray-900 block">
                Joined {agent.joined || 'Jan 2024'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50/70 border border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-amber-500 shadow-2xs">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="text-[13px] font-bold text-gray-900 block">
                Rating {agent.rating || '4.8'} ({agent.reviewCount || '12'} reviews)
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Properties by Agent Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">
            Properties by {agent.name.split(' ')[0]}
          </h2>
          <button className="text-xs font-semibold text-[#0B5A46] hover:underline cursor-pointer">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {propertiesList.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div>
                {/* Image & Status Tag */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className={`absolute top-3 left-3 text-[10.5px] font-semibold text-white px-2.5 py-0.5 rounded-full ${property.tagColor || 'bg-[#0B5A46]'}`}>
                    {property.tag}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4.5 space-y-2">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#0B5A46] transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-[11.5px] text-gray-400">
                    {property.location}
                  </p>
                  <p className="text-sm font-bold text-[#0B5A46] pt-1">
                    {property.price}
                  </p>
                </div>
              </div>

              {/* Specs Footer */}
              <div className="px-4.5 py-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                <div className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-gray-400" />
                  <span>{property.beds}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-gray-400" />
                  <span>{property.baths}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                  <span>{property.area}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
