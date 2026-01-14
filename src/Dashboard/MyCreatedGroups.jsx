import React, { useEffect, useState, useContext } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { IoLocationOutline, IoCalendarOutline, IoTimeOutline, IoPeopleOutline } from "react-icons/io5";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import DaysLeft from "../shared/DaysLeft";
import Button from "../shared/Button";
import { getAuthHeaders } from "../utils/apiHelpers";

const MyCreatedGroups = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyGroups = () => {
    if (!user?.email) return;
    fetch(
      `https://event-booking-server-wheat.vercel.app/groups?userEmail=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyGroups();
  }, [user]);

  const handleDelete = async (id, groupName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${groupName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      // Verify user is available
      if (!user) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "You must be logged in to delete an event.",
        });
        return;
      }

      // Get authentication headers (includes Firebase token)
      const headers = await getAuthHeaders(user);
      
      console.log("Attempting to delete event:", id, "User:", user.email);
      
      // Add userEmail as query parameter to help backend identify the user
      const url = user.email 
        ? `https://event-booking-server-wheat.vercel.app/groups/${id}?userEmail=${encodeURIComponent(user.email)}`
        : `https://event-booking-server-wheat.vercel.app/groups/${id}`;
      
      const res = await fetch(url, {
        method: "DELETE",
        headers,
      });
      
      console.log("Delete response status:", res.status, res.statusText);

      // Check content type before parsing
      const contentType = res.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");

      // Handle authentication errors first
      if (res.status === 401 || res.status === 403) {
        let errorData = {};
        if (isJson) {
          try {
            errorData = await res.json();
          } catch (e) {
            const text = await res.text().catch(() => "");
            errorData = { error: text || "Authentication failed" };
          }
        } else {
          const text = await res.text().catch(() => "");
          errorData = { error: text || "Authentication failed" };
        }
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: errorData.message || errorData.error || "Please log in again to delete this event.",
        });
        return;
      }

      // Check if response is OK or 404 (404 means already deleted)
      if (res.ok || res.status === 404) {
        let data = {};
        if (isJson) {
          try {
            data = await res.json();
          } catch (e) {
            // Response is OK but not JSON, that's fine
          }
        }
        Swal.fire("Deleted!", data.message || "Event deleted successfully.", "success");
        fetchMyGroups();
      } else {
        // Try to get error message - read response only once
        let errorData = {};
        let errorText = "";
        try {
          if (isJson) {
            errorData = await res.json();
          } else {
            errorText = await res.text();
          }
        } catch (e) {
          console.error("Error reading response:", e);
          errorText = "Unable to read server response";
        }
        
        console.error("Delete failed - Status:", res.status, "StatusText:", res.statusText);
        console.error("Error data:", errorData);
        console.error("Error text:", errorText);
        
        // Show detailed error message
        const errorMessage = errorData.message || errorData.error || errorText || `Server returned status ${res.status}`;
        
        // Special handling for 500 errors
        if (res.status === 500) {
          Swal.fire({
            icon: "error",
            title: "Server Error",
            html: `
              <div style="text-align: left;">
                <p><strong>Status:</strong> ${res.status} - Internal Server Error</p>
                <p><strong>Error:</strong> ${errorMessage}</p>
                <p style="font-size: 12px; color: #666; margin-top: 10px;">
                  This is a server-side error. The backend may need to handle related data deletion.
                </p>
                <p style="font-size: 11px; color: #999; margin-top: 10px;">
                  Check the browser console (F12) for technical details.
                </p>
              </div>
            `,
            width: "550px"
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Delete Event",
            html: `
              <div style="text-align: left;">
                <p><strong>Status:</strong> ${res.status} ${res.statusText}</p>
                <p><strong>Error:</strong> ${errorMessage}</p>
                <p style="font-size: 12px; color: #666; margin-top: 10px;">
                  Please check the browser console (F12) for more details.
                </p>
              </div>
            `,
            width: "500px"
          });
        }
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error", "Failed to delete event. Please try again.", "error");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] bg-white dark:bg-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-4"></div>
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">Loading your events...</p>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>HobbyHub | My Created Events</title>
      </Helmet>
      <div className="px-4 md:px-6 py-6 bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-2">
              My Created Events
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and track all events you've created
            </p>
          </div>

          {/* Empty State */}
          {groups.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  No Events Created Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start creating amazing events and bring people together!
                </p>
                <Link to="/createGroup">
                  <Button className="px-8 py-3 text-lg">
                    ✨ Create Your First Event
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Events Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <div
                  key={group._id}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  {/* Image with Badge */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={group.image || "https://via.placeholder.com/400x300?text=Event+Image"}
                      alt={group.groupName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-[#27548A] dark:bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      <DaysLeft eventDate={group.formattedDate} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">
                      {group.groupName}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {group.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <IoLocationOutline className="text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" size={18} />
                        <span className="truncate">{group.location || "Location TBD"}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <IoCalendarOutline className="text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" size={18} />
                        <span>{formatDate(group.formattedDate)}</span>
                      </div>
                      
                      {group.formatHour && (
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <IoTimeOutline className="text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" size={18} />
                          <span>{group.formatHour}</span>
                        </div>
                      )}
                      
                      {group.maxMembers && (
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <IoPeopleOutline className="text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" size={18} />
                          <span>Max {group.maxMembers} members</span>
                        </div>
                      )}
                      
                      {group.day && (
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-[#27548A] dark:text-blue-400 px-2 py-1 rounded text-xs font-semibold">
                            {group.day}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to={`/updateGroup/${group._id}`}
                        className="flex-1 bg-[#27548A] hover:bg-[#1e3d6b] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
                      >
                        <FaEdit size={14} />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(group._id, group.groupName)}
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
                      >
                        <FaTrashAlt size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCreatedGroups;
