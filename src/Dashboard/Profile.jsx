import React, { useContext, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";
import { User, Mail, Calendar, Award, Users, Camera, X } from "lucide-react";
import Swal from "sweetalert2";
import Button from "../shared/Button";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // IMGBB API Key
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || "96160096ff023a496c1296693890cf74";

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

    // Store file and show preview
    setSelectedFile(file);
    
    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Upload image to ImgBB
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

  // Handle remove image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle upload profile picture
  const handleUploadProfilePicture = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "No Image Selected",
        text: "Please select an image to upload.",
      });
      return;
    }

    setUploadingImage(true);

    try {
      // Upload image to ImgBB
      const imageUrl = await uploadImageToImgBB(selectedFile);
      console.log("Image uploaded successfully:", imageUrl);

      // Update Firebase profile
      await updateUser({
        photoURL: imageUrl,
      });

      // Success message
      Swal.fire({
        icon: "success",
        title: "Profile Picture Updated!",
        text: "Your profile picture has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      // Clear preview and file
      handleRemoveImage();

      // Reload page after 2 seconds to show updated profile
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        html: `
          <div class="text-left">
            <p class="mb-2 font-semibold text-red-600 dark:text-red-400">${error.message || "Failed to upload profile picture."}</p>
            <div class="mt-3 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
              <p class="text-gray-600 dark:text-gray-400 mt-2">
                Please verify your API key is correct at <a href="https://api.imgbb.com/" target="_blank" class="text-blue-500 underline">api.imgbb.com</a>
              </p>
            </div>
          </div>
        `,
        confirmButtonText: "OK",
        width: "500px"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>HobbyHub | Profile</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-[#27548A] to-blue-600 p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative group">
                <img
                  src={imagePreview || user?.photoURL || "https://via.placeholder.com/150"}
                  alt={user?.displayName || "User"}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-xl"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                
                {/* Upload Button Overlay */}
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="text-white" size={24} />
                </div>
                
                {/* File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {user?.displayName || "No Name"}
                </h2>
                <p className="text-blue-100 text-lg mb-4 break-all">
                  {user?.email}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                    Active User
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                    Member Since {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Profile Picture Section */}
          {selectedFile && (
            <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Upload New Profile Picture
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Selected: {selectedFile.name}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleUploadProfilePicture}
                      disabled={uploadingImage}
                      className="px-6 py-2.5 text-sm flex items-center gap-2"
                    >
                      {uploadingImage ? (
                        <>
                          <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Camera size={16} />
                          Upload Profile Picture
                        </>
                      )}
                    </Button>
                    <button
                      onClick={handleRemoveImage}
                      className="px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Details */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-12 h-12 bg-[#27548A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user?.displayName || "Not Set"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-12 h-12 bg-[#27548A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email Address</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white break-all">
                    {user?.email || "Not Available"}
                  </p>
                </div>
              </div>

              {/* Account Created */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-12 h-12 bg-[#27548A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Account Created</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user?.metadata?.creationTime 
                      ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })
                      : "Not Available"}
                  </p>
                </div>
              </div>

              {/* Last Sign In */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-12 h-12 bg-[#27548A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Sign In</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user?.metadata?.lastSignInTime 
                      ? new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : "Not Available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Provider Info */}
            {user?.providerData && user.providerData.length > 0 && (
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Account Provider
                </h3>
                <div className="flex flex-wrap gap-3">
                  {user.providerData.map((provider, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                    >
                      {provider.providerId === 'password' ? 'Email/Password' : provider.providerId}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

