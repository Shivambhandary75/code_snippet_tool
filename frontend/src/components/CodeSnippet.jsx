import React, { useState } from 'react';

export default function CodeSnippet({ code, className = '', onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        // fallback
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

  setCopied(true);
  if (typeof onCopy === 'function') onCopy();
  setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // keep silent but log for devs
      // some browsers require user gesture or https
      // eslint-disable-next-line no-console
      console.error('Failed to copy code snippet', err);
    }
  };

  return (
    <div className={`relative p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 ${className}`}>
      <pre className="whitespace-pre-wrap text-sm font-mono overflow-x-auto">{code}</pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="absolute top-2 right-2 px-2 py-1 bg-blue-500 text-white rounded text-xs"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
