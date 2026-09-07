'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Loader2 } from 'lucide-react';
import Sidebar from '../Sidebar';
import AgentList from './AgentList';
import AgentForm from './AgentForm';
import AgentProfile from './AgentProfile';

export default function AgentsContainer() {
  const router = useRouter();

  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentView, setCurrentView] = useState('list'); // 'list' | 'new' | 'edit' | 'view'
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // ---- Fetch agents from real API ----
  const fetchAgents = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/agent');
      if (!res.ok) throw new Error('Failed to fetch agents');
      const data = await res.json();
      setAgents(data);
    } catch (err) {
      console.error(err);
      setError('Agents load nahi ho sake. Please refresh karein.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  // ---- Add New Agent ----
  const handleAddAgent = async (newAgentData) => {
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAgentData),
      });

      if (res.status === 401) {
        showToast('Unauthorized: Aap admin nahi hain.');
        return;
      }
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to create agent');
      }

      const newAgent = await res.json();
      setAgents((prev) => [newAgent, ...prev]);
      setCurrentView('list');
      showToast(`Agent "${newAgent.name}" created successfully!`);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Agent create nahi ho saka.');
    }
  };

  // ---- Update Agent ----
  const handleUpdateAgent = async (updatedData) => {
    try {
      const res = await fetch(`/api/agent/${selectedAgent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.status === 401) {
        showToast('Unauthorized: Aap admin nahi hain.');
        return;
      }
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to update agent');
      }

      const updatedAgent = await res.json();
      setAgents((prev) =>
        prev.map((a) => (a.id === updatedAgent.id ? updatedAgent : a))
      );
      setCurrentView('list');
      showToast(`Agent "${updatedAgent.name}" updated successfully!`);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Agent update nahi ho saka.');
    }
  };

  // ---- Delete Agent ----
  const handleDeleteAgent = async (agentId) => {
    const target = agents.find((a) => a.id === agentId);
    if (!window.confirm(`Are you sure you want to delete agent "${target?.name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/agent/${agentId}`, {
        method: 'DELETE',
      });

      if (res.status === 401) {
        showToast('Unauthorized: Aap admin nahi hain.');
        return;
      }
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to delete agent');
      }

      setAgents((prev) => prev.filter((a) => a.id !== agentId));
      // agar delete profile view se hua to list par wapas bhej dein
      if (currentView === 'view' && selectedAgent?.id === agentId) {
        setCurrentView('list');
      }
      showToast('Agent deleted successfully.');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Agent delete nahi ho saka.');
    }
  };

  const handleSidebarSelect = (itemName) => {
    setMobileMenuOpen(false);
    if (itemName === 'Dashboard') {
      router.push('/dashboard');
    } else if (itemName === 'Agents') {
      setCurrentView('list');
    } else {
      alert(`${itemName} page is currently under construction.`);
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden font-sans">

   

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          activeItem="Agents"
          onItemSelect={handleSidebarSelect}
          onLogout={handleLogout}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Main Agent Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">

        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-serif font-bold text-gray-800">
            INMOBILIARIA HERSU
          </span>
          <div className="w-8" />
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0B5A46] text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2 animate-bounce">
            <span>✓</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && currentView === 'list' && (
          <div className="flex-1 flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 text-[#0B5A46] animate-spin" />
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && currentView === 'list' && (
          <div className="flex-1 flex flex-col items-center justify-center py-24 gap-3">
            <p className="text-sm text-red-500">{error}</p>
            <button
              onClick={fetchAgents}
              className="px-4 py-2 bg-[#0B5A46] text-white rounded-lg text-xs font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main Views */}
        {!isLoading && !error && (
          <div className="flex-1">
            {currentView === 'list' && (
              <AgentList
                agents={agents}
                onAddAgent={() => setCurrentView('new')}
                onEditAgent={(agent) => {
                  setSelectedAgent(agent);
                  setCurrentView('edit');
                }}
                onViewProfile={(agent) => {
                  setSelectedAgent(agent);
                  setCurrentView('view');
                }}
                onDeleteAgent={handleDeleteAgent}
              />
            )}

            {currentView === 'new' && (
              <AgentForm
                mode="new"
                onSave={handleAddAgent}
                onCancel={() => setCurrentView('list')}
              />
            )}

            {currentView === 'edit' && (
              <AgentForm
                mode="edit"
                initialData={selectedAgent}
                onSave={handleUpdateAgent}
                onCancel={() => setCurrentView('list')}
              />
            )}

            {currentView === 'view' && (
              <AgentProfile
                agent={selectedAgent}
                onBack={() => setCurrentView('list')}
                onEdit={(agent) => {
                  setSelectedAgent(agent);
                  setCurrentView('edit');
                }}
                onDelete={handleDeleteAgent}
              />
            )}
          </div>
        )}

      </div>

    </div>
  );
}