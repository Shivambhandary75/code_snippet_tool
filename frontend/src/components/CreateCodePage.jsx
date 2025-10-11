// src/components/CreateCodePage.jsx
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Copy, 
  Code, 
  Eye,
  EyeOff,
  Sparkles,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Toast from "./Toast";

const CreateCodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/snippets", {
        title,
        description,
        code,
        language,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        isPublic,
        favorite: false,
      });

      if (response.data.success) {
        setToast({ visible: true, message: "Snippet created successfully!" });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating snippet:", error);
      setToast({
        visible: true,
        message: error.response?.data?.message || "Failed to create snippet",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setToast({ visible: true, message: "Code copied to clipboard!" });
  };

  const languages = [
    { value: "javascript", label: "JavaScript", color: "bg-yellow-400" },
    { value: "python", label: "Python", color: "bg-blue-400" },
    { value: "typescript", label: "TypeScript", color: "bg-blue-600" },
    { value: "java", label: "Java", color: "bg-red-500" },
    { value: "cpp", label: "C++", color: "bg-pink-500" },
    { value: "html", label: "HTML", color: "bg-orange-500" },
    { value: "css", label: "CSS", color: "bg-purple-500" },
    { value: "php", label: "PHP", color: "bg-indigo-500" },
    { value: "sql", label: "SQL", color: "bg-gray-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-black to-black transition-colors duration-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-black to-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 flex items-center space-x-2 text-gray-600 dark:text-gray-400"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-800 to-black rounded-xl shadow-lg">
                  <Code className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
                    Create Snippet
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Add your code to the collection
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Zap size={16} className="text-yellow-500" />
                <span>Pro Tips</span>
              </div>
              <button
                className="group relative bg-gradient-to-r from-blue-800 to-black hover:from-blue-900 hover:to-black text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                form="snippet-form"
                disabled={isSubmitting}
              >
                <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save size={20} className="relative z-10" />
                )}
                <span className="relative z-10 font-semibold">
                  {isSubmitting ? "Creating..." : "Create Snippet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {/* Remove quick setup card for a cleaner look */}

        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form id="snippet-form" onSubmit={handleSave} className="space-y-6">
              {/* Title */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all duration-300"
                  placeholder="Give your snippet a descriptive title..."
                />
              </div>

              {/* Description */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all duration-300 resize-vertical"
                  placeholder="Describe what this code does, its purpose, or any important notes..."
                />
              </div>

              {/* Code Editor */}
              <div className="bg-gradient-to-r from-blue-900 via-black to-black rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Code *
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {language.toUpperCase()}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                      title="Copy code"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-1">
                  <textarea
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={15}
                    className="w-full bg-black text-blue-100 p-4 font-mono text-sm focus:outline-none border-0 focus:ring-0 resize-vertical"
                    placeholder="// Start writing your code here...
// You can paste existing code or write new code
// Make sure to format it properly for better readability"
                    spellCheck="false"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar - Settings */}
          <div className="space-y-6">
            {/* Language & Privacy */}
            <div className="bg-gradient-to-r from-blue-900 via-black to-black rounded-2xl shadow-sm p-6 border border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Settings
              </h3>

              {/* Language */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Programming Language *
                </label>
                <select
                  required
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all duration-300"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Privacy */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Visibility
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      checked={isPublic}
                      onChange={() => setIsPublic(true)}
                      className="text-green-500 focus:ring-green-500"
                    />
                    <div className="flex items-center space-x-2">
                      <Eye size={16} className="text-green-500" />
                      <span className="text-sm">Public</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">
                      Visible to everyone
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      checked={!isPublic}
                      onChange={() => setIsPublic(false)}
                      className="text-green-500 focus:ring-green-500"
                    />
                    <div className="flex items-center space-x-2">
                      <EyeOff size={16} className="text-gray-500" />
                      <span className="text-sm">Private</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">
                      Only visible to you
                    </span>
                  </label>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all duration-300"
                  placeholder="react, hooks, api, ..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate tags with commas
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-blue-900 via-black to-black border border-blue-900 rounded-2xl p-6">
              <h4 className="font-semibold text-blue-200 mb-3 flex items-center space-x-2">
                <Zap size={16} className="text-blue-500" />
                <span>Pro Tips</span>
              </h4>
              <ul className="space-y-2 text-sm text-blue-300">
                <li>• Use descriptive titles and descriptions</li>
                <li>• Add relevant tags for better searchability</li>
                <li>• Format your code properly</li>
                <li>• Include comments for complex logic</li>
                <li>• Choose the right language for syntax highlighting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-blue-900">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-xl bg-blue-900 text-white font-medium hover:bg-black transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleCopy}
              className="px-6 py-3 rounded-xl bg-blue-900 text-blue-100 font-medium hover:bg-black transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Copy size={16} />
              <span>Copy Code</span>
            </button>

            <button
              type="submit"
              form="snippet-form"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-800 to-black hover:from-blue-900 hover:to-black text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Create Snippet</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Toast */}
        {toast.visible && (
          <Toast
            message={toast.message}
            onClose={() => setToast({ visible: false, message: "" })}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCodePage;