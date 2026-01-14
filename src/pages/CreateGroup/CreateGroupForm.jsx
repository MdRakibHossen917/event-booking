import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Button from "../../shared/Button";
import { FaCloudUploadAlt, FaSpinner, FaTimes } from "react-icons/fa";
import { getAuthHeaders } from "../../utils/apiHelpers";

const CreateGroupForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    groupName: "",
    description: "",
    location: "",
    maxMembers: "",
    image: "",
    formattedDate: "",
    formatHour: "",
    day: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // IMGBB API Key - Replace with your actual API key
  // You can get it from https://api.imgbb.com/
  // User's API Key: 96160096ff023a496c1296693890cf74
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
    setFormData((prev) => ({ ...prev, image: "" }));
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

  // Keep convertToBase64 function for potential future use (base64 upload option)
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
    setFormData((prev) => ({ ...prev, image: "" }));
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate image is provided
    if (!selectedFile && !formData.image) {
      Swal.fire({
        icon: "warning",
        title: "Image Required",
        text: "Please select an image to upload or provide an image URL.",
      });
      return;
    }

    setLoading(true);
    setUploadingImage(true);

    try {
      let imageUrl = formData.image;

      // If a file is selected, upload it first
      if (selectedFile) {
        try {
          imageUrl = await uploadImageToImgBB(selectedFile);
          console.log("Image uploaded successfully:", imageUrl);
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

      // Now create the event with the uploaded image URL
      const newGroup = {
        ...formData,
        image: imageUrl, // Use uploaded image URL or existing URL
        maxMembers: parseInt(formData.maxMembers),
        creatorName: user?.displayName || user?.email,
        creatorImage:
          user?.photoURL || "https://via.placeholder.com/40?text=No+Image",
        userEmail: user?.email,
      };

      // Get authentication headers (includes Firebase token)
      const headers = await getAuthHeaders(user);

      console.log("Creating event with data:", newGroup);
      console.log("Headers:", { ...headers, Authorization: headers.Authorization ? "Bearer ***" : "Missing" });

      const response = await fetch("https://event-booking-server-wheat.vercel.app/createGroup", {
        method: "POST",
        headers,
        body: JSON.stringify(newGroup),
      });

      console.log("Response status:", response.status, response.statusText);

      // Check content type before parsing
      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");

      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        setLoading(false);
        setUploadingImage(false);
        let errorData = {};
        if (isJson) {
          try {
            errorData = await response.json();
          } catch (e) {
            const text = await response.text().catch(() => "");
            errorData = { error: text || "Authentication failed" };
          }
        } else {
          const text = await response.text().catch(() => "");
          errorData = { error: text || "Authentication failed" };
        }
        console.error("Authentication error:", errorData);
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: errorData.message || errorData.error || "Please log in again to create an event.",
        });
        return;
      }

      // Parse response
      let data = {};
      let errorText = "";
      try {
        if (isJson) {
          data = await response.json();
        } else {
          errorText = await response.text();
        }
      } catch (e) {
        console.error("Error parsing response:", e);
        errorText = "Unable to parse server response";
      }

      console.log("Response data:", data);
      console.log("Response error text:", errorText);

      setLoading(false);
      setUploadingImage(false);

      // Handle server errors
      if (!response.ok) {
        const errorMessage = data.message || data.error || errorText || `Server returned status ${response.status}`;
        console.error("Server error - Status:", response.status, "Message:", errorMessage);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `
            <div style="text-align: left;">
              <p><strong>Status:</strong> ${response.status} ${response.statusText}</p>
              <p><strong>Error:</strong> ${errorMessage}</p>
              <p style="font-size: 12px; color: #666; margin-top: 10px;">
                Please check the browser console (F12) for more details.
              </p>
            </div>
          `,
          width: "500px"
        });
        return;
      }

      // Check if success
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Event Created Successfully!",
          text: "Your event has been created successfully.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Reset form
          setFormData({
            groupName: "",
            description: "",
            location: "",
            maxMembers: "",
            image: "",
            formattedDate: "",
            formatHour: "",
            day: "",
          });
          setImagePreview(null);
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

          navigate("/myGroup");
        });
      } else {
        const errorMessage = data.message || data.error || errorText || "Failed to create event. Please try again.";
        console.error("Create failed - Success false. Data:", data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `
            <div style="text-align: left;">
              <p><strong>Error:</strong> ${errorMessage}</p>
              <p style="font-size: 12px; color: #666; margin-top: 10px;">
                Please check the browser console (F12) for more details.
              </p>
            </div>
          `,
          width: "500px"
        });
      }
    } catch (error) {
      setLoading(false);
      setUploadingImage(false);
      console.error("Error creating event:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-2 bg-white rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Group Name */}
        <div>
          <label
            htmlFor="groupName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Group Name <span className="text-red-500">*</span>
          </label>
          <input
            id="groupName"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            placeholder="Enter your group name"
            required
            disabled={loading}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where is the group based?"
            required
            disabled={loading}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Max Members */}
        <div>
          <label
            htmlFor="maxMembers"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Members <span className="text-red-500">*</span>
          </label>
          <input
            id="maxMembers"
            name="maxMembers"
            type="number"
            min={1}
            value={formData.maxMembers}
            onChange={handleChange}
            placeholder="Maximum number of members"
            required
            disabled={loading}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Day */}
        <div>
          <label
            htmlFor="day"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Day <span className="text-red-500">*</span>
          </label>
          <select
            id="day"
            name="day"
            value={formData.day}
            onChange={handleChange}
            required
            disabled={loading}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Day</option>
            <option>Sunday</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="formattedDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            id="formattedDate"
            name="formattedDate"
            type="date"
            value={formData.formattedDate}
            onChange={handleChange}
            disabled={loading}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Time */}
        <div>
          <label
            htmlFor="formatHour"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Time
          </label>
          <input
            id="formatHour"
            name="formatHour"
            type="time"
            value={formData.formatHour}
            onChange={handleChange}
            disabled={loading}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Event Image <span className="text-red-500">*</span>
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
                id="image-upload"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={loading || uploadingImage}
                className="hidden"
              />
              
              {(loading && uploadingImage) ? (
                <div className="flex flex-col items-center">
                  <FaSpinner className="text-4xl text-[#27548A] dark:text-blue-400 animate-spin mb-3" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Uploading image and creating event...
                  </p>
                </div>
              ) : imagePreview || (formData.image && !selectedFile) ? (
                <div className="relative">
                  <img
                    src={imagePreview || formData.image}
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
                    PNG, JPG, GIF up to 5MB (Image will upload when you create the event)
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
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  Or
                </span>
              </div>
            </div>

            {/* Image URL Input (Alternative) */}
            <div>
              <label
                htmlFor="image-url"
                className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
              >
                Enter Image URL
              </label>
              <input
                id="image-url"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                disabled={loading || uploadingImage}
                className="input input-bordered w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Preview if URL is provided */}
            {formData.image && !imagePreview && formData.image.startsWith('http') && (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                  onError={() => {
                    Swal.fire({
                      icon: "error",
                      title: "Invalid Image URL",
                      text: "The provided URL does not point to a valid image.",
                    });
                    setFormData((prev) => ({ ...prev, image: "" }));
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

        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe your group"
            required
            disabled={loading}
            rows={4}
            className="textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading || (!selectedFile && !formData.image)}
        className={`w-full py-3 text-base my-6 ${
          loading || (!selectedFile && !formData.image)
            ? "opacity-70 cursor-not-allowed"
            : ""
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <FaSpinner className="animate-spin" />
            {uploadingImage ? "Uploading image..." : "Creating event..."}
          </span>
        ) : (
          "Create Event"
        )}
      </Button>
    </form>
  );
};

export default CreateGroupForm;
