import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const RelatedArticles = ({ articles, currentArticleId }) => {
  // Filter out current article and limit to 3
  const relatedArticles = articles
    .filter((article) => article._id !== currentArticleId)
    .slice(0, 3);

  if (relatedArticles.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Related Articles
      </h3>
      {relatedArticles.map((article) => (
        <Link
          key={article._id}
          to={`/articles/${article._id}`}
          className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#27548A] dark:hover:border-[#27548A] transition-all duration-200 group"
        >
          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
            {article.coverImage ? (
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">📝</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#27548A] dark:group-hover:text-[#27548A] transition-colors mb-1">
              {article.title}
            </h4>
            {article.shortDescription && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {article.shortDescription}
              </p>
            )}
          </div>
          <ArrowRight
            size={20}
            className="flex-shrink-0 text-gray-400 group-hover:text-[#27548A] group-hover:translate-x-1 transition-all duration-200"
          />
        </Link>
      ))}
    </div>
  );
};

export default RelatedArticles;

