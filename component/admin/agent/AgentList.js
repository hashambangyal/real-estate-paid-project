import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  Building2, 
  UserCheck, 
  Mail, 
  Phone, 
  Home, 
  MoreVertical, 
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function AgentList({ 
  agents, 
  onAddAgent, 
  onEditAgent, 
  onViewProfile,
  onDeleteAgent 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Filter agents based on search & status
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.phone.includes(searchTerm);

    if (filterStatus === 'Active') return matchesSearch && agent.status === 'Active';
    if (filterStatus === 'WithProperties') return matchesSearch && agent.propertiesCount > 0;
    return matchesSearch;
  });

  // Calculate statistics
  const totalAgents = agents.length;
  const assignedProperties = agents.reduce((acc, a) => acc + (a.propertiesCount || 0), 0);
  const activeAgents = agents.filter(a => a.status === 'Active').length;

  return (
    <div className="p-6 lg:p-8 space-y-7 max-w-7xl mx-auto font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-[28px] font-bold text-[#1A1D20] tracking-tight">
            Agents
          </h1>
          <p className="text-xs sm:text-sm text-[#718096] mt-0.5 font-normal">
            Manage your real estate agents
          </p>
        </div>

        <button
          onClick={onAddAgent}
          className="inline-flex items-center justify-center gap-2 bg-[#0B5A46] hover:bg-[#084A39] active:bg-[#063C2E] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Agent</span>
        </button>
      </div>

      {/* Search and Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search agents by name..."
            className="w-full h-11 pl-4 pr-10 bg-white border border-gray-200 rounded-xl text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0B5A46] focus:ring-1 focus:ring-[#0B5A46] transition-all shadow-2xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-11 pl-3.5 pr-8 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:border-[#0B5A46] cursor-pointer appearance-none shadow-2xs"
            >
              <option value="All">All Agents</option>
              <option value="Active">Active Only</option>
              <option value="WithProperties">With Properties</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* 3 Summary Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Card 1: Total Agents */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 border border-gray-100/80">
            <Users className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <span className="text-[11.5px] font-medium text-gray-400 block">
              Total Agents
            </span>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {totalAgents}
            </span>
          </div>
        </div>

        {/* Card 2: Assigned Properties */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 border border-gray-100/80">
            <Building2 className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <span className="text-[11.5px] font-medium text-gray-400 block">
              Assigned Properties
            </span>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {assignedProperties}
            </span>
          </div>
        </div>

        {/* Card 3: Active Agents */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 border border-gray-100/80">
            <UserCheck className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <span className="text-[11.5px] font-medium text-gray-400 block">
              Active Agents
            </span>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {activeAgents}
            </span>
          </div>
        </div>

      </div>

      {/* Agents Cards Grid */}
      {filteredAgents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3 stroke-[1.5]" />
          <h3 className="text-base font-semibold text-gray-800">No agents found</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            No agents match your current search query or filter. Try a different keyword or add a new agent.
          </p>
          <button
            onClick={onAddAgent}
            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0B5A46] text-white text-xs font-medium rounded-lg hover:bg-[#084A39]"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Agent
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between relative group"
            >
              <div>
                
                {/* Header: Avatar, Name, Role & Options Menu */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={agent.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                      alt={agent.name}
                      className="w-11 h-11 rounded-full object-cover border border-gray-100 shadow-2xs shrink-0"
                    />
                    <div>
                      <h2 className="text-[15px] font-bold text-[#1A1D20] leading-snug hover:text-[#0B5A46] transition-colors cursor-pointer" onClick={() => onViewProfile(agent)}>
                        {agent.name}
                      </h2>
                      <span className="text-[11.5px] text-[#8C95A6] font-normal block leading-tight">
                        {agent.role || 'Real Estate Agent'}
                      </span>
                    </div>
                  </div>

                  {/* 3 dots menu dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === agent.id ? null : agent.id)}
                      className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="Agent options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === agent.id && (
                      <div className="absolute right-0 top-7 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 text-xs">
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onViewProfile(agent);
                          }}
                          className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-gray-50 text-gray-700"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Profile
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onEditAgent(agent);
                          }}
                          className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-gray-50 text-gray-700"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit Details
                        </button>
                        {onDeleteAgent && (
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onDeleteAgent(agent.id);
                            }}
                            className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-red-50 text-red-600 border-t border-gray-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-2 text-[12.5px] text-gray-600 mb-4">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{agent.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{agent.phone}</span>
                  </div>
                </div>

                {/* Properties & Social links row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 text-xs text-gray-600 mb-5">
                  <div className="flex items-center gap-2">
                    <Home className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-medium text-gray-700">{agent.propertiesCount || 0} Properties</span>
                  </div>

                  {/* Social icons */}
                  <div className="flex items-center gap-2">
                    {agent.facebook && (
                      <a
                        href={agent.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1877F2] hover:opacity-80 transition-opacity"
                        title="Facebook"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                    {agent.instagram && (
                      <a
                        href={agent.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#E4405F] hover:opacity-80 transition-opacity"
                        title="Instagram"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom Buttons: View Profile & Edit */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onViewProfile(agent)}
                  className="py-2 px-3 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-center cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  type="button"
                  onClick={() => onEditAgent(agent)}
                  className="py-2 px-3 rounded-xl bg-[#0B5A46] hover:bg-[#084A39] text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
