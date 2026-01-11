import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ArticleCard from "./ArticleCard";
import ArticleFilter from "./ArticleFilter";
import ArticleSkeleton from "./ArticleSkeleton";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://event-booking-server-wheat.vercel.app/articles")
      .then((res) => {
        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return [];
        }
        return res.json();
      })
      .then((data) => {
        // Handle both array response and object with articles property
        const articlesList = Array.isArray(data) ? data : (data.articles || []);
        setArticles(articlesList);
        setFilteredArticles(articlesList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setArticles([]);
        setFilteredArticles([]);
        setLoading(false);
      });
  }, []);

  // Filter articles based on category and search query
  useEffect(() => {
    let filtered = [...articles];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (article) =>
          (article.category || "General").toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title?.toLowerCase().includes(query) ||
          article.shortDescription?.toLowerCase().includes(query) ||
          article.content?.toLowerCase().includes(query) ||
          article.authorName?.toLowerCase().includes(query)
      );
    }

    setFilteredArticles(filtered);
  }, [selectedCategory, searchQuery, articles]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>HobbyHub | Articles</title>
        </Helmet>
        <section className="py-16 bg-white dark:bg-gray-900 min-h-screen">
          <div className="w-11/12 mx-auto max-w-7xl">
            {/* Header Skeleton */}
            <div className="text-center mb-12 animate-pulse">
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>

            {/* Filter Skeleton */}
            <div className="mb-12 space-y-6 animate-pulse">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
                ))}
              </div>
            </div>

            {/* Articles Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ArticleSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>HobbyHub | Articles</title>
      </Helmet>
      <section className="py-16 bg-white dark:bg-gray-900 min-h-screen">
        <div className="w-11/12 mx-auto max-w-7xl">
          {/* Header Section */}
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              Latest Articles
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Discover insights, tips, and stories from our community. Stay updated with the latest news and expert advice.
            </p>
          </header>

          {/* Filter Section */}
          <div className="mb-12">
            <ArticleFilter
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onCategoryChange={handleCategoryChange}
              onSearchChange={handleSearchChange}
            />
          </div>

          {/* Results Count */}
          {filteredArticles.length > 0 && (
            <div className="mb-8">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredArticles.length}</span>{" "}
                {filteredArticles.length === 1 ? "article" : "articles"}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          )}

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {searchQuery || selectedCategory !== "All"
                  ? "No Articles Found"
                  : "No Articles Yet"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {searchQuery || selectedCategory !== "All"
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "Be the first to share an article with the community!"}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/50"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Articles;
