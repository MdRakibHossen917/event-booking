import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { Calendar, User, Clock, ArrowRight, Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import Button from "../shared/Button";
import { getAuthHeaders } from "../utils/apiHelpers";

const MyArticles = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

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
        // Filter articles by current user's email
        const myArticles = articlesList.filter(
          (article) => article.authorEmail === user.email
        );
        setArticles(myArticles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setArticles([]);
        setLoading(false);
      });
  }, [user?.email]);

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // Get authentication headers
        const headers = await getAuthHeaders(user);

        const response = await fetch(`https://event-booking-server-wheat.vercel.app/articles/${id}`, {
          method: "DELETE",
          headers,
        });

        // Handle authentication errors
        if (response.status === 401 || response.status === 403) {
          const errorData = await response.json().catch(() => ({}));
          Swal.fire({
            icon: "error",
            title: "Authentication Error",
            text: errorData.message || errorData.error || "Please log in again to delete this article.",
          });
          return;
        }

        // Check if response is OK or 404 (404 means already deleted)
        if (response.ok || response.status === 404) {
          // Try to parse as JSON, but handle non-JSON responses
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            Swal.fire("Deleted!", "Article deleted successfully.", "success");
            setArticles((prev) => prev.filter((article) => article._id !== id));
          } else {
            // If response is OK/404 but not JSON, assume success (item already deleted)
            Swal.fire("Deleted!", "Article deleted successfully.", "success");
            setArticles((prev) => prev.filter((article) => article._id !== id));
          }
        } else {
          // Response not OK and not 404, try to get error message
          const errorData = await response.json().catch(() => ({ message: "Failed to delete article" }));
          Swal.fire("Error", errorData.message || errorData.error || "Failed to delete article", "error");
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Failed to delete article. Please try again.", "error");
      }
    }
  };

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
    return (
      <>
        <Helmet>
          <title>HobbyHub | My Articles</title>
        </Helmet>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-3"></div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Loading articles...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>HobbyHub | My Articles</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-2">
              My Articles
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your published articles
            </p>
          </div>
          <Link to="/dashboard/create-article">
            <Button className="px-6 py-3">
              + Create Article
            </Button>
          </Link>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No Articles Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start sharing your knowledge and create your first article!
            </p>
            <Link to="/dashboard/create-article">
              <Button className="px-8 py-3">
                ✨ Create Your First Article
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image || "https://via.placeholder.com/400x300?text=Article+Image"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#27548A] dark:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {article.category || "General"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Article Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-[#27548A] dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {article.summary || article.description || "No description available"}
                  </p>

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#27548A] dark:text-blue-400" />
                      <span className="truncate">{article.author || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#27548A] dark:text-blue-400" />
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#27548A] dark:text-blue-400" />
                      <span>{calculateReadingTime(article.content)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                    <Link
                      to={`/articles/${article._id}`}
                      className="flex-1 bg-[#27548A] hover:bg-[#1e3d6b] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 text-sm"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(article._id, article.title)}
                      className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center hover:shadow-lg active:scale-95"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyArticles;

