import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://event-booking-server-wheat.vercel.app/articles")
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return [];
        }
        return res.json();
      })
      .then((data) => {
        const articlesList = Array.isArray(data) ? data : (data.articles || []);
        // Get latest 3 articles
        setArticles(articlesList.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setArticles([]);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
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

  if (loading) {
    return null; // Don't show loading, just hide if no articles
  }

  if (articles.length === 0) {
    return null; // Don't show section if no articles
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white via-[#F5FAFF]/20 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-11/12 mx-auto max-w-7xl">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover insights, tips, and stories from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article) => {
            const category = article.category || "General";
            return (
              <article
                key={article._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-2 w-full"
              >
                {/* Featured Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {article.coverImage ? (
                    <>
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900">
                      <div className="text-4xl">📝</div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1.5 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm"
                      style={{ backgroundColor: "#27548A" }}
                    >
                      {category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:transition-colors hover:text-[#27548A] dark:hover:text-[#27548A]">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {article.shortDescription ||
                      article.content?.substring(0, 150) + "..." ||
                      "No description available."}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1.5">
                      <User size={14} style={{ color: "#27548A" }} />
                      <span className="font-medium">
                        {article.authorName || "Anonymous"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} style={{ color: "#27548A" }} />
                      <span>
                        {formatDate(article.publishDate || article.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} style={{ color: "#27548A" }} />
                      <span>
                        {calculateReadingTime(
                          article.content || article.shortDescription
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Link
                    to={`/articles/${article._id}`}
                    className="inline-flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all duration-200 group/btn"
                    style={{ color: "#27548A" }}
                  >
                    Read More
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Articles Button */}
        <div className="text-center mt-8">
          <Link to="/articles">
            <button
              className="px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#27548A] focus:ring-offset-2"
              style={{
                backgroundColor: "#27548A",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#1e3d6b";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#27548A";
              }}
            >
              View All Articles →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;

