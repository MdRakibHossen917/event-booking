import React from "react";
import { Calendar, User, Clock, Share2 } from "lucide-react";

const ArticleHeader = ({ article }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateReadingTime = (content) => {
    if (!content) return "2 min";
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return `${readingTime} min read`;
  };

  const category = article.category || "General";

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = article.title;
    const text = article.shortDescription || "";

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <header className="mb-12">
      {/* Category Badge */}
      <div className="mb-6">
        <span
          className="inline-block px-4 py-2 text-white text-sm font-semibold rounded-full"
          style={{ backgroundColor: "#27548A" }}
        >
          {category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
        {article.title}
      </h1>

      {/* Subtitle / Summary */}
      {article.shortDescription && (
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {article.shortDescription}
        </p>
      )}

      {/* Author Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          {/* Author Avatar */}
          <div className="relative">
            <img
              src={article.authorImage || "https://via.placeholder.com/60"}
              alt={article.authorName || "Author"}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Author Info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User size={16} style={{ color: "#27548A" }} />
              <span className="font-semibold text-gray-900 dark:text-white">
                {article.authorName || "Anonymous"}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} style={{ color: "#27548A" }} />
                <span>{formatDate(article.publishDate || article.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} style={{ color: "#27548A" }} />
                <span>{calculateReadingTime(article.content)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <Share2 size={16} style={{ color: "#27548A" }} />
            Share:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleShare("facebook")}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center text-gray-700 dark:text-gray-300"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-400 hover:text-white transition-all duration-200 flex items-center justify-center text-gray-700 dark:text-gray-300"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-700 hover:text-white transition-all duration-200 flex items-center justify-center text-gray-700 dark:text-gray-300"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;

