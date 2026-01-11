import React from "react";
import { User, Mail } from "lucide-react";

const AuthorCard = ({ author }) => {
  if (!author) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={author.authorImage || "https://via.placeholder.com/80"}
          alt={author.authorName || "Author"}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {author.authorName || "Anonymous"}
          </h3>
          {author.authorEmail && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <Mail size={14} style={{ color: "#27548A" }} />
              <span>{author.authorEmail}</span>
            </div>
          )}
        </div>
      </div>
      {/* Author bio placeholder - can be extended if author bio is available */}
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {author.bio || "Content writer and contributor."}
      </p>
    </div>
  );
};

export default AuthorCard;

