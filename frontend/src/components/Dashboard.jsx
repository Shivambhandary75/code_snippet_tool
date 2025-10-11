// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Code, 
  Copy,
  Edit,
  Trash2,
  Star,
  Share2,
  Moon,
  Sun,
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize dark mode from system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    setIsLoading(false);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Mock data
  const snippets = [
    {
      id: 1,
      title: 'React Hook Example',
      description: 'Custom hook for API calls with error handling and loading states',
      language: 'javascript',
      code: 'const useApi = (url) => {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  // ... hook implementation\n}',
      tags: ['react', 'hooks', 'api', 'custom'],
      favorite: true,
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      title: 'Python Data Processing',
      description: 'Pandas data cleaning and transformation pipeline',
      language: 'python',
      code: 'def clean_data(df):\n    df = df.drop_duplicates()\n    df = df.fillna(method="ffill")\n    return df',
      tags: ['python', 'pandas', 'data', 'cleaning'],
      favorite: false,
      createdAt: '2024-01-14',
    },
    {
      id: 3,
      title: 'CSS Grid Layout',
      description: 'Responsive grid system with CSS Grid',
      language: 'css',
      code: '.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}',
      tags: ['css', 'layout', 'responsive', 'grid'],
      favorite: true,
      createdAt: '2024-01-13',
    },
    {
      id: 4,
      title: 'TypeScript Utility Types',
      description: 'Custom TypeScript utility types for better type safety',
      language: 'typescript',
      code: 'type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;',
      tags: ['typescript', 'utility', 'types'],
      favorite: false,
      createdAt: '2024-01-12',
    },
  ];

  const languages = ['all', 'javascript', 'python', 'css', 'html', 'typescript', 'java'];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLanguage = selectedLanguage === 'all' || snippet.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<Code className="text-blue-600" size={24} />}
            label="Total Snippets"
            value="24"
            trend="+5 this month"
            color="blue"
            delay="0"
          />
          <StatCard 
            icon={<Star className="text-yellow-600" size={24} />}
            label="Favorites"
            value="8"
            trend="33% of total"
            color="yellow"
            delay="100"
          />
          <StatCard 
            icon={<Filter className="text-green-600" size={24} />}
            label="Languages"
            value="6"
            trend="Most used: JS"
            color="green"
            delay="200"
          />
          <StatCard 
            icon={<Zap className="text-purple-600" size={24} />}
            label="This Month"
            value="5"
            trend="Active usage"
            color="purple"
            delay="300"
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-sm p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-md">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search snippets by title, description, or tags..."
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Language Filter */}
            <div className="relative group">
              <select
                className="appearance-none px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-10"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang === 'all' ? 'All Languages' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Snippets Grid/List */}
        <AnimatedContainer>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSnippets.map((snippet, index) => (
                <SnippetCard key={snippet.id} snippet={snippet} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              {filteredSnippets.map((snippet, index) => (
                <SnippetListItem key={snippet.id} snippet={snippet} index={index} />
              ))}
            </div>
          )}
        </AnimatedContainer>

        {/* Empty State */}
        {filteredSnippets.length === 0 && (
          <EmptyState searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
};

// Enhanced Stat Card Component
const StatCard = ({ icon, label, value, trend, color, delay }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-500 to-yellow-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-500 hover:scale-105"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <Sparkles className="text-gray-300 dark:text-gray-600 group-hover:text-yellow-400 transition-colors duration-300" size={16} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{trend}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/50 dark:to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

// Enhanced Snippet Card Component
const SnippetCard = ({ snippet, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient border effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transition-opacity duration-500 ${
        isHovered ? 'opacity-10' : 'opacity-0'
      }`} />
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              snippet.language === 'javascript' ? 'bg-yellow-400' :
              snippet.language === 'python' ? 'bg-blue-400' :
              snippet.language === 'css' ? 'bg-purple-400' :
              snippet.language === 'typescript' ? 'bg-blue-600' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
              {snippet.language}
            </span>
          </div>
          <button className={`p-2 rounded-lg transition-all duration-300 ${
            snippet.favorite 
              ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/20' 
              : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/20'
          }`}>
            <Star size={18} fill={snippet.favorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Title and Description */}
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {snippet.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{snippet.description}</p>

        {/* Code Preview */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
          <code className="text-sm text-gray-700 dark:text-gray-300 font-mono line-clamp-3">
            {snippet.code}
          </code>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {snippet.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg transition-colors duration-300 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <div className="flex space-x-1">
            <ActionButton icon={<Copy size={16} />} label="Copy" color="gray" />
            <ActionButton icon={<Edit size={16} />} label="Edit" color="green" />
            <ActionButton icon={<Trash2 size={16} />} label="Delete" color="red" />
          </div>
          <ActionButton icon={<Share2 size={16} />} label="Share" color="purple" />
        </div>
      </div>
    </div>
  );
};

// Enhanced Snippet List Item
const SnippetListItem = ({ snippet, index }) => {
  return (
    <div 
      className="group border-b border-gray-200/50 dark:border-gray-700/50 last:border-b-0 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-500 hover:pl-8"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-4 mb-3">
              <div className={`w-3 h-3 rounded-full ${
                snippet.language === 'javascript' ? 'bg-yellow-400' :
                snippet.language === 'python' ? 'bg-blue-400' :
                snippet.language === 'css' ? 'bg-purple-400' :
                snippet.language === 'typescript' ? 'bg-blue-600' : 'bg-gray-400'
              }`}></div>
              <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {snippet.title}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 capitalize px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                {snippet.language}
              </span>
              <div className="flex space-x-1">
                {snippet.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg">
                    {tag}
                  </span>
                ))}
                {snippet.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg">
                    +{snippet.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{snippet.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Created {snippet.createdAt}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ActionButton icon={<Star size={16} fill={snippet.favorite ? 'currentColor' : 'none'} />} label="Favorite" color="yellow" small />
            <ActionButton icon={<Copy size={16} />} label="Copy" color="gray" small />
            <ActionButton icon={<Edit size={16} />} label="Edit" color="green" small />
            <ActionButton icon={<Trash2 size={16} />} label="Delete" color="red" small />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Action Button Component
const ActionButton = ({ icon, label, color, small = false }) => {
  const colorClasses = {
    gray: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700',
    blue: 'text-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/20',
    green: 'text-green-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-500/20',
    red: 'text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20',
    yellow: 'text-yellow-400 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-500/20',
    purple: 'text-purple-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-500/20'
  };

  return (
    <button 
      className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${colorClasses[color]} ${small ? 'p-1' : 'p-2'}`}
      title={label}
    >
      {icon}
    </button>
  );
};

// Loading Screen Component
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading your snippets...</p>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ searchTerm }) => (
  <div className="text-center py-16 animate-fade-in">
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
      <Code className="text-white" size={32} />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {searchTerm ? 'No snippets found' : 'No snippets yet'}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
      {searchTerm 
        ? `No snippets match "${searchTerm}". Try adjusting your search terms.`
        : 'Start organizing your code by creating your first snippet!'
      }
    </p>
    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
      Create Your First Snippet
    </button>
  </div>
);

// Animation Wrapper Component
const AnimatedContainer = ({ children }) => (
  <div className="animate-fade-in-up">
    {children}
  </div>
);

export default Dashboard;