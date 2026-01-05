import React, { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FiGrid, FiList } from 'react-icons/fi';
import Layout from '../../components/Layout/Layout';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const GroupsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('For You');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const navItems = [
    { label: 'For You', icon: '🌟' },
    { label: 'Your Groups', icon: '👤' },
    { label: 'Discover', icon: '🔍' },
    { label: 'Feeds', icon: '📰' },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // TODO: Implement data fetching based on the activeTab
  };

  return (
    <Layout>
      <div className="flex h-full bg-gray-50 dark:bg-gray-900">
        {/* Left Sidebar (Navigation) */}
        <Sidebar activeTab={activeTab} handleTabChange={handleTabChange} navItems={navItems} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Bar */}
          <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Groups
            </h1>
            <div className="flex space-x-3 items-center">
              {/* Settings Button */}
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150">
                <IoSettingsOutline className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </header>

          {/* Controls Bar (Search, View Mode) */}
          <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
            <div className="flex items-center space-x-3 w-full max-w-lg">
              {/* Search Input */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search groups"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Create Group Button */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-150 text-sm font-semibold shadow-md">
                <FaPlus className="w-3 h-3" />
                <span>Create New Group</span>
              </button>
              
              {/* View Mode Toggle */}
              <div className="hidden sm:flex space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition duration-150 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow dark:bg-gray-600'
                      : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-label="Grid View"
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition duration-150 ${
                    viewMode === 'list'
                      ? 'bg-white shadow dark:bg-gray-600'
                      : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-label="List View"
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area (Scrollable) */}
          <MainContent activeTab={activeTab} viewMode={viewMode} />

        </div>
      </div>
    </Layout>
  );
};

export default GroupsPage;