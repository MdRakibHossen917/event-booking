import React, { useEffect, useState, useContext } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { IoLocationOutline, IoCalendarOutline, IoTimeOutline, IoPeopleOutline, IoLogOutOutline } from "react-icons/io5";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import DaysLeft from "../shared/DaysLeft";
import Button from "../shared/Button";
import { getAuthHeaders } from "../utils/apiHelpers";

const MyEvents = () => {
  const { user } = useContext(AuthContext);
  const [createdGroups, setCreatedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loadingCreated, setLoadingCreated] = useState(true);
  const [loadingJoined, setLoadingJoined] = useState(true);

  // Fetch Created Groups
  const fetchCreatedGroups = () => {
    if (!user?.email) {
      setLoadingCreated(false);
      return;
    }
    fetch(`https://event-booking-server-wheat.vercel.app/groups?userEmail=${user.email}`)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }
        return res.json();
      })
      .then((data) => {
        setCreatedGroups(data || []);
        setLoadingCreated(false);
      })
      .catch((err) => {
        console.error("Error fetching created groups:", err);
        setCreatedGroups([]);
        setLoadingCreated(false);
      });
  };

  // Fetch Joined Groups
  useEffect(() => {
    if (!user?.email) {
      setLoadingJoined(false);
      return;
    }

    fetch(`https://event-booking-server-wheat.vercel.app/user-joined-groups?email=${user.email}`)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }
        return res.json();
      })
      .then(async (joinedData) => {
        if (!joinedData || !Array.isArray(joinedData)) {
          setJoinedGroups([]);
          setLoadingJoined(false);
          return;
        }

        const groupIds = joinedData.map((g) => g.groupId).filter(Boolean);

        if (groupIds.length === 0) {
          setJoinedGroups([]);
          setLoadingJoined(false);
          return;
        }

        const res = await fetch("https://event-booking-server-wheat.vercel.app/groupsByIds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: groupIds }),
        });
        
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }
        
        const groupsDetails = await res.json();
        setJoinedGroups(Array.isArray(groupsDetails) ? groupsDetails : []);
        setLoadingJoined(false);
      })
      .catch((err) => {
        console.error("Error fetching joined groups:", err);
        setJoinedGroups([]);
        setLoadingJoined(false);
      });
  }, [user]);

  useEffect(() => {
    fetchCreatedGroups();
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
      // Get authentication headers (includes Firebase token)
      const headers = await getAuthHeaders(user);

      const res = await fetch(`https://event-booking-server-wheat.vercel.app/groups/${id}`, {
        method: "DELETE",
        headers,
      });

      // Handle authentication errors
      if (res.status === 401 || res.status === 403) {
        const errorData = await res.json().catch(() => ({}));
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: errorData.message || errorData.error || "Please log in again to delete this event.",
        });
        return;
      }

      // Check content type before parsing
      const contentType = res.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");

      // Check if response is OK or 404 (404 means already deleted)
      if (res.ok || res.status === 404) {
        const data = isJson ? await res.json().catch(() => ({})) : {};
        Swal.fire("Deleted!", data.message || "Event deleted successfully.", "success");
        fetchCreatedGroups();
      } else {
        // Try to get error message
        const errorData = isJson ? await res.json().catch(() => ({})) : {};
        console.error("Server error:", errorData, "Status:", res.status);
        Swal.fire("Error", errorData.message || errorData.error || `Failed to delete event (Status: ${res.status})`, "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error", "Failed to delete event. Please try again.", "error");
    }
  };

  const handleLeaveGroup = async (groupId, groupName) => {
    const result = await Swal.fire({
      title: "Leave Event?",
      text: `Are you sure you want to leave "${groupName}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, leave it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      // Get authentication headers (includes Firebase token)
      const headers = await getAuthHeaders(user);

      const res = await fetch("https://event-booking-server-wheat.vercel.app/leaveGroup", {
        method: "POST",
        headers,
        body: JSON.stringify({ groupId, userEmail: user.email }),
      });

      // Handle authentication errors
      if (res.status === 401 || res.status === 403) {
        const errorData = await res.json().catch(() => ({}));
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: errorData.message || errorData.error || "Please log in again to leave this event.",
        });
        return;
      }

      const data = await res.json();

      if (data.success) {
        Swal.fire("Left Event", "You have left the event successfully.", "success");
        setJoinedGroups((prev) => prev.filter((group) => group._id !== groupId));
      } else {
        Swal.fire("Error", data.message || data.error || "Failed to leave event", "error");
      }
    } catch (err) {
      console.error("Leave group error:", err);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
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

  const EventCard = ({ group, type = "created" }) => (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
      {/* Image with Badge */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={group.image || "https://via.placeholder.com/400x300?text=Event+Image"}
          alt={group.groupName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-[#27548A] dark:bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
          <DaysLeft eventDate={group.formattedDate} />
        </div>
        {type === "joined" && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Joined
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-[calc(100%-160px)]">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">
          {group.groupName}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 flex-grow">
          {group.description}
        </p>

        {/* Event Details */}
        <div className="space-y-1.5 mb-3 text-xs">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <IoLocationOutline className="text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" size={14} />
            <span className="truncate">{group.location || "Location TBD"}</span>
          </div>
          
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <IoCalendarOutline className="text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" size={14} />
            <span>{formatDate(group.formattedDate)}</span>
          </div>
          
          {group.formatHour && (
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <IoTimeOutline className="text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" size={14} />
              <span>{group.formatHour}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700 mt-auto">
          {type === "created" ? (
            <>
              <Link
                to={`/updateGroup/${group._id}`}
                className="flex-1 bg-[#27548A] hover:bg-[#1e3d6b] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 hover:shadow-lg active:scale-95 text-sm"
              >
                <FaEdit size={12} />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(group._id, group.groupName)}
                className="flex-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 hover:shadow-lg active:scale-95 text-sm"
              >
                <FaTrashAlt size={12} />
                Delete
              </button>
            </>
          ) : (
            <>
              <Link
                to={`/group/${group._id}`}
                className="flex-1 bg-[#27548A] hover:bg-[#1e3d6b] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center hover:shadow-lg active:scale-95 text-sm"
              >
                View
              </Link>
              <button
                onClick={() => handleLeaveGroup(group._id, group.groupName)}
                className="flex-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 hover:shadow-lg active:scale-95 text-sm"
              >
                <IoLogOutOutline size={14} />
                Leave
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>HobbyHub | My Events</title>
      </Helmet>
      <div className="px-4 md:px-6 py-6 bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-2">
              My Events
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your created events and track joined events
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Side - My Created Events */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#27548A] dark:text-blue-400">
                  My Created Events
                </h2>
                <Link to="/createGroup">
                  <Button className="px-4 py-2 text-sm">
                    + Create Event
                  </Button>
                </Link>
              </div>

              {loadingCreated ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-3"></div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Loading...</p>
                  </div>
                </div>
              ) : createdGroups.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-5xl mb-3">📅</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    No Events Created Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    Start creating amazing events!
                  </p>
                  <Link to="/createGroup">
                    <Button className="px-6 py-2.5 text-sm">
                      ✨ Create Your First Event
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                  {createdGroups.map((group) => (
                    <EventCard key={group._id} group={group} type="created" />
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Events You Joined */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#27548A] dark:text-blue-400">
                  Events You Joined
                </h2>
                <Link to="/allGroups">
                  <Button className="px-4 py-2 text-sm">
                    Browse Events
                  </Button>
                </Link>
              </div>

              {loadingJoined ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-3"></div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Loading...</p>
                  </div>
                </div>
              ) : joinedGroups.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-5xl mb-3">🎯</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    No Joined Events Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    Discover amazing events and join communities!
                  </p>
                  <Link to="/allGroups">
                    <Button className="px-6 py-2.5 text-sm">
                      🔍 Browse All Events
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                  {joinedGroups.map((group) => (
                    <EventCard key={group._id} group={group} type="joined" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEvents;

