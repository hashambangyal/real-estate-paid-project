'use client';

import React from 'react';
import {
  Camera,
  UserX,
  MapPinOff,
  FileWarning,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function QuickActionsWidget({
  activeFilter = null,
  onSelectFilter,
}) {
  const actions = [
    {
      id: 'no_images',
      title: 'Properties without Images',
      desc: 'Add high quality photos to attract clients',
      icon: Camera,
      badgeColor: 'text-amber-700 bg-amber-50 group-hover:bg-amber-100',
    },
    {
      id: 'no_agent',
      title: 'Properties without Agent',
      desc: 'Assign agents to handle customer inquiries',
      icon: UserX,
      badgeColor: 'text-blue-700 bg-blue-50 group-hover:bg-blue-100',
    },
    {
      id: 'no_city',
      title: 'Properties without City',
      desc: 'Set accurate city & location coordinates',
      icon: MapPinOff,
      badgeColor: 'text-rose-700 bg-rose-50 group-hover:bg-rose-100',
    },
    {
      id: 'incomplete',
      title: 'Properties with Incomplete Details',
      desc: 'Review listings lacking specs or descriptions',
      icon: FileWarning,
      badgeColor: 'text-purple-700 bg-purple-50 group-hover:bg-purple-100',
    },
  ];

  const handleClick = (filterId) => {
    // If already active, clear it, otherwise activate
    if (activeFilter === filterId) {
      onSelectFilter(null);
    } else {
      onSelectFilter(filterId);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0B5A46]" />
            <h3 className="text-base font-bold text-[#1A1D20]">
              Quick Actions
            </h3>
          </div>
          {activeFilter && (
            <button
              type="button"
              onClick={() => onSelectFilter(null)}
              className="text-xs font-semibold text-[#0B5A46] hover:underline cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-0.5">
          Click any action to instantly filter the properties list below
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          const isActive = activeFilter === act.id;

          return (
            <button
              key={act.id}
              type="button"
              onClick={() => handleClick(act.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 group cursor-pointer ${
                isActive
                  ? 'border-[#0B5A46] bg-[#0B5A46]/5 ring-1 ring-[#0B5A46]/30 shadow-xs'
                  : 'border-gray-200/80 bg-gray-50/50 hover:bg-white hover:border-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-colors ${act.badgeColor}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4
                    className={`text-xs font-bold leading-tight truncate ${
                      isActive ? 'text-[#0B5A46]' : 'text-gray-800'
                    }`}
                  >
                    {act.title}
                  </h4>
                  {isActive ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5A46] shrink-0" />
                  ) : (
                    <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-gray-400 leading-snug mt-0.5 truncate">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
