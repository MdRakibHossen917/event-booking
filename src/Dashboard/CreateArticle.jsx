import React, { useContext, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Button from "../shared/Button";
import { FaSpinner, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { getAuthHeaders } from "../utils/apiHelpers";

const CreateArticle = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    coverImage: "",
    category: "General",
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // IMGBB API Key
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || "96160096ff023a496c1296693890cf74";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file selection (only preview, no upload)
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
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

    // Validate file size (max 5MB)
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

    // Store file and show preview (upload will happen on form submit)
    setSelectedFile(file);
    
    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Clear any existing image URL since we have a file to upload
    setFormData((prev) => ({ ...prev, coverImage: "" }));
  };

  // Upload image to ImgBB (called on form submit)
  const uploadImageToImgBB = async (file) => {
    try {
      // Try method 1: Send file directly as binary
      let uploadFormData = new FormData();
      uploadFormData.append('image', file);

      let response = await fetch(
        `https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API_KEY}`,
        {
          method: 'POST',
          body: uploadFormData
        }
      );

      let data = await response.json();
      console.log("ImgBB API Response (Binary):", data);

      // If binary upload fails with invalid API key, try base64 method
      if (!data.success && data.error && (data.error.id === 100 || data.error.id === "100")) {
        console.log("Binary upload failed, trying base64 method...");
        
        const base64Image = await convertToBase64(file);
        uploadFormData = new FormData();
        uploadFormData.append('image', base64Image);

        response = await fetch(
          `https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API_KEY}`,
          {
            method: 'POST',
            body: uploadFormData
          }
        );

        data = await response.json();
        console.log("ImgBB API Response (Base64):", data);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("HTTP Error Response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if upload was successful
      if (data.success && data.data && data.data.url) {
        return data.data.url; // Return the uploaded image URL
      } else {
        // Handle API errors
        let errorMessage = "Upload failed";
        
        if (data.error) {
          if (data.error.id === 100 || data.error.id === "100") {
            errorMessage = `Invalid API key (Error 100). Please verify your ImgBB API key at https://api.imgbb.com/`;
          } else if (data.error.message) {
            errorMessage = data.error.message;
          } else if (data.error.id) {
            errorMessage = `Error ${data.error.id}: ${data.error.message || 'Unknown error'}`;
          }
        } else if (data.status === 400) {
          errorMessage = "Bad request. Please check your image format.";
        } else if (data.status === 403) {
          errorMessage = "Forbidden. Invalid API key or access denied.";
        } else if (!data.success) {
          errorMessage = data.error?.message || `Upload failed. Status: ${data.status || 'unknown'}`;
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove data:image/...;base64, prefix and just get the base64 string
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: "" }));
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
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
          console.log("Cover image uploaded successfully:", coverImageUrl);
        } catch (uploadError) {
          setLoading(false);
          setUploadingImage(false);
          Swal.fire({
            icon: "error",
            title: "Image Upload Failed",
            html: `
              <div class="text-left">
                <p class="mb-2 font-semibold text-red-600 dark:text-red-400">${uploadError.message || "Failed to upload image."}</p>
                <div class="mt-3 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  <p class="text-gray-600 dark:text-gray-400 mt-2">
                    Please verify your API key is correct at <a href="https://api.imgbb.com/" target="_blank" class="text-blue-500 underline">api.imgbb.com</a>
                  </p>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  💡 Tip: You can use the image URL option as an alternative.
                </p>
              </div>
            `,
            confirmButtonText: "OK",
            width: "500px"
          });
          return;
        }
      }

      setUploadingImage(false);

      const newArticle = {
        title: formData.title.trim(),
        shortDescription: formData.shortDescription.trim() || formData.content.substring(0, 150) + "...",
        content: formData.content.trim(),
        coverImage: coverImageUrl || "",
        category: formData.category || "General",
        authorName: user?.displayName || user?.email || "Anonymous",
        authorImage: user?.photoURL || "",
        publishDate: new Date().toISOString(),
        // Note: authorEmail and authorId will be set automatically by backend from authenticated user
      };

      // Get authentication headers (includes Firebase token + fallback headers)
      const headers = await getAuthHeaders(user);

      const response = await fetch("https://event-booking-server-wheat.vercel.app/articles", {
        method: "POST",
        headers,
        body: JSON.stringify(newArticle),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // API endpoint doesn't exist - show helpful message
        setLoading(false);
        setUploadingImage(false);
        Swal.fire({
          icon: "info",
          title: "Backend Not Configured",
          html: `
            <div class="text-left">
              <p class="mb-3">The articles API endpoint is not yet set up on your backend server.</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                <strong>Required API Endpoint:</strong><br/>
                POST https://event-booking-server-wheat.vercel.app/articles
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Please set up the backend endpoint to enable article creation.
              </p>
            </div>
          `,
          confirmButtonText: "OK",
          width: "500px"
        });
        return;
      }

      const data = await response.json();

      setLoading(false);

      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: data.message || data.error || "Please log in again to publish an article.",
        });
        return;
      }

      // Handle server errors
      if (!response.ok) {
        console.error("Server error:", data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || data.error || "Failed to publish article. Please try again.",
        });
        return;
      }

      if (data.success || response.ok) {
        Swal.fire({
          icon: "success",
          title: "Article Published!",
          text: "Your article has been published successfully.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Reset form
          setFormData({
            title: "",
            shortDescription: "",
            content: "",
            coverImage: "",
            category: "General",
          });
          setImagePreview(null);
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          // Navigate to articles page
          navigate("/articles");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Failed to publish article. Please try again.",
        });
      }
    } catch (error) {
      setLoading(false);
      setUploadingImage(false);
      console.error("Error creating article:", error);
      
      // Check if it's a network error or JSON parsing error
      if (error.message.includes("JSON") || error.message.includes("fetch")) {
        Swal.fire({
          icon: "info",
          title: "Backend Not Configured",
          html: `
            <div class="text-left">
              <p class="mb-3">The articles API endpoint is not yet set up on your backend server.</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                <strong>Required API Endpoint:</strong><br/>
                POST https://event-booking-server-wheat.vercel.app/articles
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Please set up the backend endpoint to enable article creation.
              </p>
            </div>
          `,
          confirmButtonText: "OK",
          width: "500px"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong! Please try again.",
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>HobbyHub | Create Article</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Create Article
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your insights and stories with the community
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
                placeholder="Brief description (optional, will be auto-generated if empty)"
                disabled={loading}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-[#27548A] focus:outline-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave empty to auto-generate from content
              </p>
            </div>

            {/* Category/Type */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Article Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={loading}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-[#27548A] focus:outline-none"
              >
                <option value="General">General</option>
                <option value="Study Abroad">Study Abroad</option>
                <option value="Career">Career</option>
                <option value="Visa">Visa</option>
                <option value="Tips">Tips</option>
                <option value="News">News</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Select the category for this article
              </p>
            </div>

            {/* Cover Image Upload */}
            <div>
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Cover Image
              </label>

              {/* Image Upload Button */}
              <div className="flex flex-col gap-4">
                {/* Upload Area */}
                <div
                  onClick={() => !loading && !uploadingImage && fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
                    loading || uploadingImage
                      ? 'border-[#27548A] bg-blue-50 dark:bg-blue-900/20 cursor-wait'
                      : 'border-gray-300 dark:border-gray-600 hover:border-[#27548A] hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="coverImage-upload"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={loading || uploadingImage}
                    className="hidden"
                  />
                  
                  {(loading && uploadingImage) ? (
                    <div className="flex flex-col items-center">
                      <FaSpinner className="text-4xl text-[#27548A] dark:text-blue-400 animate-spin mb-3" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Uploading image and publishing article...
                      </p>
                    </div>
                  ) : imagePreview || (formData.coverImage && !selectedFile) ? (
                    <div className="relative">
                      <img
                        src={imagePreview || formData.coverImage}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FaCloudUploadAlt className="text-4xl text-gray-400 dark:text-gray-500 mb-3" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Click to select image
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 5MB (Image will upload when you publish the article)
                      </p>
                    </div>
                  )}
                </div>

                {/* Or use URL option */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Or
                    </span>
                  </div>
                </div>

                {/* Image URL Input (Alternative) */}
                <div>
                  <label
                    htmlFor="coverImage-url"
                    className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
                  >
                    Enter Image URL
                  </label>
                  <input
                    id="coverImage-url"
                    name="coverImage"
                    type="url"
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    disabled={loading || uploadingImage}
                    className="input input-bordered w-full text-sm dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-[#27548A] focus:outline-none"
                  />
                </div>

                {/* Preview if URL is provided */}
                {formData.coverImage && !imagePreview && formData.coverImage.startsWith('http') && (
                  <div className="relative">
                    <img
                      src={formData.coverImage}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg shadow-md"
                      onError={() => {
                        Swal.fire({
                          icon: "error",
                          title: "Invalid Image URL",
                          text: "The provided URL does not point to a valid image.",
                        });
                        setFormData((prev) => ({ ...prev, coverImage: "" }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                    >
                      <FaTimes size={16} />
                    </button>
                  </div>
                )}
              </div>
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
                disabled={loading}
                rows={15}
                className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-[#27548A] focus:outline-none resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formData.content.length} characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={() => navigate("/articles")}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || (selectedFile && !formData.title.trim())}
                className="flex-1 px-6 py-3 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    {uploadingImage ? "Uploading image..." : "Publishing..."}
                  </>
                ) : (
                  "Publish Article"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateArticle;

