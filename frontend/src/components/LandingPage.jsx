import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Star, Users, Zap, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Organize Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Code Snippets
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Store, organize, and share your code snippets with ease. Build your personal library of reusable code and never lose track of your best solutions again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose VibeCoded?
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to manage your code snippets effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Code className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Smart Organization
            </h3>
            <p className="text-gray-600">
              Organize your snippets by language, tags, and categories. Find what you need instantly with powerful search and filtering.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Favorites & Collections
            </h3>
            <p className="text-gray-600">
              Mark your most useful snippets as favorites and create custom collections for different projects or technologies.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Share & Collaborate
            </h3>
            <p className="text-gray-600">
              Share your snippets publicly or keep them private. Collaborate with your team and discover amazing code from the community.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Organize Your Code?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using VibeCoded to manage their code snippets more efficiently.
          </p>
          <Link
            to="/signup"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center space-x-2"
          >
            <span>Start Building Your Library</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400">Snippets Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">5K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Languages Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99%</div>
              <div className="text-gray-400">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
