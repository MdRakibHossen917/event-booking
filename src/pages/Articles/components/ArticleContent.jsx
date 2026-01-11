import React from "react";

const ArticleContent = ({ content }) => {
  // Parse content and render HTML
  const renderContent = () => {
    if (!content) return <p className="text-gray-600 dark:text-gray-400">No content available.</p>;

    // If content is HTML, render it directly
    if (content.includes("<")) {
      return (
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-[#27548A] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ol:text-gray-700 dark:prose-ol:text-gray-300"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }

    // If content is plain text, format it with paragraphs
    const paragraphs = content.split("\n\n").filter((p) => p.trim());
    
    return (
      <div className="space-y-6">
        {paragraphs.map((paragraph, index) => {
          // Check if it's a heading
          if (paragraph.startsWith("# ")) {
            return (
              <h2 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {paragraph.replace(/^# /, "")}
              </h2>
            );
          }
          if (paragraph.startsWith("## ")) {
            return (
              <h3 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
                {paragraph.replace(/^## /, "")}
              </h3>
            );
          }
          
          // Check if it's a list
          if (paragraph.includes("\n- ") || paragraph.includes("\n* ")) {
            const items = paragraph.split(/\n[-*] /).filter((item) => item.trim());
            return (
              <ul key={index} className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                {items.map((item, i) => (
                  <li key={i} className="pl-2">{item.trim()}</li>
                ))}
              </ul>
            );
          }

          // Regular paragraph
          return (
            <p key={index} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {paragraph.trim()}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      {/* Custom styling for better readability */}
      <style>{`
        .prose {
          color: rgb(55 65 81);
        }
        .dark .prose {
          color: rgb(209 213 219);
        }
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.75;
        }
        .prose h2 {
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-size: 1.875rem;
          font-weight: 700;
        }
        .prose h3 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .prose ul, .prose ol {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .prose blockquote {
          border-left: 4px solid #27548A;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: rgb(107 114 128);
        }
        .dark .prose blockquote {
          color: rgb(156 163 175);
        }
        .prose code {
          background-color: rgb(243 244 246);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        .dark .prose code {
          background-color: rgb(31 41 55);
        }
        .prose pre {
          background-color: rgb(243 244 246);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .dark .prose pre {
          background-color: rgb(31 41 55);
        }
        .prose a {
          color: #27548A;
          text-decoration: underline;
        }
        .prose a:hover {
          text-decoration: underline;
        }
      `}</style>
      {renderContent()}
    </article>
  );
};

export default ArticleContent;

