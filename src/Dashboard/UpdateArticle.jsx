import React, { useContext, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Button from "../shared/Button";
import { FaSpinner, FaCloudUploadAlt, FaTimes } from "react-icons/fa";

const UpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    coverImage: "",
    category: "General",
  });

  const [loading, setLoading] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // IMGBB API Key
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || "96160096ff023a496c1296693890cf74";

  // Fetch article data
  useEffect(() => {
    if (!id) {
      setLoadingArticle(false);
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
        const article = articlesList.find((a) => a._id === id);
        
        if (article) {
          setFormData({
            title: article.title || "",
            shortDescription: article.shortDescription || article.summary || "",
            content: article.content || "",
            coverImage: article.coverImage || article.image || "",
            category: article.category || "General",
          });
          if (article.coverImage || article.image) {
            setImagePreview(article.coverImage || article.image);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Article Not Found",
            text: "The article you're trying to edit doesn't exist.",
          });
          navigate("/dashboard/my-articles");
        }
        setLoadingArticle(false);
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load article data.",
        });
        setLoadingArticle(false);
        navigate("/dashboard/my-articles");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please select an image file (jpg, png, gif, etc.)",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please select an image smaller than 5MB",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setFormData((prev) => ({ ...prev, coverImage: "" }));
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async (file) => {
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: uploadFormData
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && data.data && data.data.url) {
      return data.data.url;
    } else {
      throw new Error(data.error?.message || "Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Title Required",
        text: "Please enter an article title.",
      });
      return;
    }

    if (!formData.content.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Content Required",
        text: "Please enter article content.",
      });
      return;
    }

    setLoading(true);
    setUploadingImage(true);

    try {
      let coverImageUrl = formData.coverImage;

      // If a file is selected, upload it first
      if (selectedFile) {
        try {
          coverImageUrl = await uploadImageToImgBB(selectedFile);
        } catch (uploadError) {
          setLoading(false);
          setUploadingImage(false);
          Swal.fire({
            icon: "error",
            title: "Image Upload Failed",
            text: uploadError.message || "Failed to upload image.",
          });
          return;
        }
      }

      setUploadingImage(false);

      // Get Firebase token
      const token = await user.getIdToken();

      const updatedArticle = {
        title: formData.title.trim(),
        shortDescription: formData.shortDescription.trim() || formData.content.substring(0, 150) + "...",
        content: formData.content.trim(),
        coverImage: coverImageUrl || "",
        category: formData.category || "General",
      };

      // Update article with PUT request
      const response = await fetch(
        `https://event-booking-server-wheat.vercel.app/articles/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedArticle),
        }
      );

      // Handle errors
      if (response.status === 401 || response.status === 403) {
        alert("Unauthorized: Please log in again");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error:", errorData);
        Swal.fire("Error", errorData.message || "Failed to update article", "error");
        setLoading(false);
        return;
      }

      // Success
      const data = await response.json().catch(() => ({}));
      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Article Updated!",
        text: "Your article has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/my-articles");
    } catch (error) {
      setLoading(false);
      setUploadingImage(false);
      console.error("Error updating article:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong! Please try again.",
      });
    }
  };

  if (loadingArticle) {
    return (
      <>
        <Helmet>
          <title>HobbyHub | Update Article</title>
        </Helmet>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-3"></div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Loading article...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>HobbyHub | Update Article</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Update Article
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edit your article and share your insights with the community
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter article title"
                required
                disabled={loading}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-[#27548A] focus:outline-none"
              />
            </div>

            {/* Short Description */}
            <div>
              <label
                htmlFor="shortDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Short Description
              </label>
              <input
                id="shortDescription"
                name="shortDescription"
                type="text"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief description (optional)"
                disabled={loading}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-[#27548A] focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-[#27548A] focus:outline-none"
              >
                <option value="General">General</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Article Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your article content here..."
                required
                rows={10}
                disabled={loading}
                className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-[#27548A] focus:outline-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image
              </label>
              <div className="space-y-4">
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setSelectedFile(null);
                        setFormData((prev) => ({ ...prev, coverImage: "" }));
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}

                {/* File Input */}
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      disabled={loading || uploadingImage}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#27548A] dark:hover:border-blue-400 transition-colors">
                      {uploadingImage ? (
                        <>
                          <FaSpinner className="animate-spin text-[#27548A] dark:text-blue-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Uploading...
                          </span>
                        </>
                      ) : (
                        <>
                          <FaCloudUploadAlt className="text-[#27548A] dark:text-blue-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {imagePreview ? "Change Image" : "Upload Image"}
                          </span>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {/* Image URL Input */}
                <div>
                  <input
                    type="text"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder="Or enter image URL"
                    disabled={loading || !!selectedFile}
                    className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-[#27548A] focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter an image URL if you don't want to upload a file
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading || uploadingImage}
                className="flex-1 px-6 py-3"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  "Update Article"
                )}
              </Button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/my-articles")}
                disabled={loading}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateArticle;

