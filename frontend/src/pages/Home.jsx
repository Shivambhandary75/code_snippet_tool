import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [snippet, setSnippet] = useState({ title: "", code: "", description: "" });

    const handleCreateSnippet = () => {
        setShowModal(true);
    };

    const handleChange = (e) => {
        setSnippet({ ...snippet, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can send snippet to backend or update state
        alert(`Snippet Created!\nTitle: ${snippet.title}`);
        setShowModal(false);
        setSnippet({ title: "", code: "", description: "" });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
            <Header onCreateSnippet={handleCreateSnippet} />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Welcome to VibeCoded!</h1>
                <p className="text-lg">Your one-stop platform for coding vibes and projects.</p>
            </main>
            <Footer />

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-indigo-600 dark:text-pink-400">Create New Snippet</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                value={snippet.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                required
                            />
                            <textarea
                                name="code"
                                value={snippet.code}
                                onChange={handleChange}
                                placeholder="Code"
                                rows={4}
                                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                                required
                            />
                            <textarea
                                name="description"
                                value={snippet.description}
                                onChange={handleChange}
                                placeholder="Description"
                                rows={2}
                                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:scale-105 transition"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}