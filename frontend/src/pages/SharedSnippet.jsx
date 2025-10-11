import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CodeSnippet from '../components/CodeSnippet';

export default function SharedSnippet() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(`/api/snippets/public/shared/${id}`);
        if (resp.data && resp.data.success) {
          setSnippet(resp.data.data);
        } else {
          setError(resp.data?.message || 'Snippet not found');
        }
      } catch (err) {
        console.error('Failed to fetch shared snippet', err);
        setError(err.response?.data?.message || 'Failed to load snippet');
      } finally {
        setLoading(false);
      }
    };
    fetchSnippet();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{snippet.title}</h1>
      <p className="text-gray-600 mb-4">{snippet.description}</p>
      <CodeSnippet code={snippet.code} />
    </div>
  );
}