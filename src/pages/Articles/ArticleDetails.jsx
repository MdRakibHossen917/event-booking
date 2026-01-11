import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Tag } from "lucide-react";
import ArticleHeader from "./components/ArticleHeader";
import ArticleContent from "./components/ArticleContent";
import AuthorCard from "./components/AuthorCard";
import RelatedArticles from "./components/RelatedArticles";
import TableOfContents from "./components/TableOfContents";
import ReadingProgress from "./components/ReadingProgress";
import Comments from "./components/Comments";

const ArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all articles first
    fetch("https://event-booking-server-wheat.vercel.app/articles")
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return [];
        }
        return res.json();
      })
      .then((data) => {
        const articlesList = Array.isArray(data) ? data : data.articles || [];
        setAllArticles(articlesList);
        
        // Find the current article
        const currentArticle = articlesList.find((a) => a._id === id);
        if (currentArticle) {
          setArticle(currentArticle);
        } else {
          setError("Article not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
        setError("Failed to load article");
        setLoading(false);
      });
  }, [id]);

  // Find previous and next articles
  const currentIndex = allArticles.findIndex((a) => a._id === id);
  const previousArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Extract tags from article (if available) or use category
  const tags = article?.tags || (article?.category ? [article.category] : []);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>HobbyHub | Loading Article...</title>
        </Helmet>
        <ReadingProgress />
        <section className="py-16 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
          <div className="w-11/12 mx-auto max-w-4xl text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-4"></div>
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              Loading article...
            </p>
          </div>
        </section>
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Helmet>
          <title>HobbyHub | Article Not Found</title>
        </Helmet>
        <ReadingProgress />
        <section className="py-16 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
          <div className="w-11/12 mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-red-500 dark:text-red-400 mb-4">
              Article Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {error || "The article you're looking for doesn't exist."}
            </p>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#27548A] text-white rounded-lg font-semibold hover:bg-[#1e3d6b] transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Articles
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>HobbyHub | {article.title}</title>
        <meta name="description" content={article.shortDescription || article.content?.substring(0, 160)} />
      </Helmet>
      <ReadingProgress />
      <section className="py-8 md:py-12 bg-white dark:bg-gray-900 min-h-screen">
        <div className="w-11/12 mx-auto max-w-7xl">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#27548A] dark:hover:text-[#27548A] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Featured Image */}
              {article.coverImage && (
                <div className="mb-8 rounded-2xl overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                </div>
              )}

              {/* Article Header */}
              <ArticleHeader article={article} />

              {/* Article Content */}
              <div className="prose-wrapper mb-12">
                <ArticleContent content={article.content} />
              </div>

              {/* Tags Section */}
              {tags.length > 0 && (
                <div className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Tag size={20} style={{ color: "#27548A" }} />
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-[#27548A] hover:text-white dark:hover:bg-[#27548A] transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio Card */}
              <div className="mb-12">
                <AuthorCard author={article} />
              </div>

              {/* Previous / Next Navigation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {previousArticle && (
                  <Link
                    to={`/articles/${previousArticle._id}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#27548A] dark:hover:border-[#27548A] transition-all duration-200 group"
                  >
                    <ArrowLeft
                      size={24}
                      className="text-gray-400 group-hover:text-[#27548A] transition-colors"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Previous Article</p>
                      <p className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#27548A] dark:group-hover:text-[#27548A] transition-colors">
                        {previousArticle.title}
                      </p>
                    </div>
                  </Link>
                )}
                {nextArticle && (
                  <Link
                    to={`/articles/${nextArticle._id}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#27548A] dark:hover:border-[#27548A] transition-all duration-200 group"
                  >
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Next Article</p>
                      <p className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#27548A] dark:group-hover:text-[#27548A] transition-colors">
                        {nextArticle.title}
                      </p>
                    </div>
                    <ArrowRight
                      size={24}
                      className="text-gray-400 group-hover:text-[#27548A] transition-colors"
                    />
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <aside className="lg:col-span-4">
              <div className="space-y-6">
                {/* Table of Contents - Desktop Only */}
                <div className="hidden lg:block">
                  <div className="sticky top-24 space-y-6">
                    <TableOfContents content={article.content} />
                    <RelatedArticles articles={allArticles} currentArticleId={id} />
                  </div>
                </div>

                {/* Comments Section - Right Side on Desktop, Below on Mobile */}
                <Comments articleId={id} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticleDetails;
