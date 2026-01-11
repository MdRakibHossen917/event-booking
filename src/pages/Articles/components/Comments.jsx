import React, { useState, useEffect } from "react";
import { MessageCircle, Send, User, Calendar, Trash2 } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Comments = ({ articleId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commenterName, setCommenterName] = useState("");

  // Load comments
  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://event-booking-server-wheat.vercel.app/articles/${articleId}/comments`
      );
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // API endpoint doesn't exist yet, return empty array
        setComments([]);
        setLoading(false);
        return;
      }
      
      if (response.ok) {
        const data = await response.json();
        setComments(Array.isArray(data) ? data : (data.comments || []));
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Comment Required",
        text: "Please enter a comment.",
      });
      return;
    }

    if (!user && !commenterName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Name Required",
        text: "Please enter your name.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const newComment = {
        articleId: articleId,
        text: commentText.trim(),
        authorName: user?.displayName || commenterName.trim(),
        authorEmail: user?.email || "",
        authorImage: user?.photoURL || "",
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(
        `https://event-booking-server-wheat.vercel.app/articles/${articleId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // API endpoint doesn't exist yet - show friendly message instead of error
        Swal.fire({
          icon: "info",
          title: "Comments Feature Coming Soon",
          html: `
            <p class="mb-2">The comments API endpoint is not configured yet.</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Please contact the administrator to enable the comments feature.
            </p>
          `,
          confirmButtonText: "OK",
          confirmButtonColor: "#27548A",
        });
        setSubmitting(false);
        return;
      }

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Comment Added!",
          text: "Your comment has been posted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        
        setCommentText("");
        setCommenterName("");
        fetchComments(); // Refresh comments
      } else {
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to post comment");
        } catch (jsonError) {
          throw new Error("Failed to post comment. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      // Only show error if it's not about API endpoint
      if (!error.message.includes("API endpoint")) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to post comment. Please try again.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    const result = await Swal.fire({
      title: "Delete Comment?",
      text: "Are you sure you want to delete this comment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://event-booking-server-wheat.vercel.app/articles/${articleId}/comments/${commentId}`,
          {
            method: "DELETE",
          }
        );

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Comments API endpoint is not available yet.");
        }

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Comment has been deleted.",
            timer: 1500,
            showConfirmButton: false,
          });
          fetchComments();
        } else {
          throw new Error("Failed to delete comment");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to delete comment. Please try again.",
        });
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const canDeleteComment = (comment) => {
    if (!user) return false;
    return (
      comment.authorEmail === user.email ||
      comment.authorName === user.displayName ||
      comment.userId === user.uid
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle size={24} style={{ color: "#27548A" }} />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        {!user && (
          <div className="mb-4">
            <label
              htmlFor="commenterName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="commenterName"
              type="text"
              value={commenterName}
              onChange={(e) => setCommenterName(e.target.value)}
              placeholder="Enter your name"
              required={!user}
              disabled={submitting}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#27548A] focus:border-transparent transition-all"
            />
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="commentText"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Add a Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="commentText"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment here..."
            required
            disabled={submitting}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#27548A] focus:border-transparent transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !commentText.trim()}
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#27548A" }}
          onMouseEnter={(e) => {
            if (!submitting && commentText.trim()) {
              e.target.style.backgroundColor = "#1e3d6b";
            }
          }}
          onMouseLeave={(e) => {
            if (!submitting && commentText.trim()) {
              e.target.style.backgroundColor = "#27548A";
            }
          }}
        >
          <Send size={18} />
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#27548A] border-t-transparent mb-4"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Loading comments...</p>
          </div>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <p className="text-gray-600 dark:text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments
            .sort((a, b) => new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt))
            .map((comment) => (
              <div
                key={comment._id || comment.id}
                className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#27548A] dark:hover:border-[#27548A] transition-all duration-200"
              >
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={comment.authorImage || "https://via.placeholder.com/40"}
                    alt={comment.authorName || "User"}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User size={16} style={{ color: "#27548A" }} />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {comment.authorName || "Anonymous"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={12} style={{ color: "#27548A" }} />
                        <span>{formatDate(comment.timestamp || comment.createdAt)}</span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    {canDeleteComment(comment) && (
                      <button
                        onClick={() => handleDelete(comment._id || comment.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                        aria-label="Delete comment"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {comment.text || comment.comment}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Comments;

