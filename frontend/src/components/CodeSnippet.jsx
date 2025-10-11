import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function CodeSnippet({ code, className = '', onCopy, maxLines = 8 }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  // determine how many lines the code has
  const lines = typeof code === 'string' ? code.split('\n').length : 0;
  const shouldTruncate = !expanded && lines > maxLines;
  const { darkMode } = useContext(ThemeContext);

  const fadeStyle = darkMode
    ? { background: 'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.85))' }
    : { background: 'linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0.95))' };

  return (
    <div className={`relative p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 ${className}`}>
      <div className="relative">
        <pre
          className="text-sm font-mono whitespace-pre overflow-auto"
          style={shouldTruncate ? { maxHeight: `${maxLines * 1.35}rem`, overflow: 'hidden' } : { maxHeight: '40rem', overflow: 'auto' }}
        >
          {code}
        </pre>

        {/* gradient fade when truncated */}
        {shouldTruncate && (
          <div
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-10"
            style={fadeStyle}
          />
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy code'}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>

          {lines > maxLines && (
            <button
              type="button"
              onClick={() => setExpanded((s) => !s)}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-xs"
            >
              {expanded ? 'Show less' : `Show more (${lines} lines)`}
            </button>
          )}
        </div>

        {/* small indicator when scrollable */}
        {!shouldTruncate && lines > maxLines && (
          <span className="text-xs text-gray-500">Scrollable</span>
        )}
      </div>
    </div>
  );
}
