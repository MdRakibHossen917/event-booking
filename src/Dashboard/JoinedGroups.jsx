import React, { useEffect, useState, useContext } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { IoLocationOutline, IoCalendarOutline, IoTimeOutline, IoPeopleOutline, IoLogOutOutline, IoEyeOutline } from "react-icons/io5";
import DaysLeft from "../shared/DaysLeft";
import Button from "../shared/Button";
import { getAuthHeaders } from "../utils/apiHelpers";

const JoinedGroups = () => {
  const { user } = useContext(AuthContext);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://event-booking-server-wheat.vercel.app/user-joined-groups?email=${user.email}`
    )
      .then((res) => res.json())
      .then(async (joinedData) => {
        const groupIds = joinedData.map((g) => g.groupId);

        if (groupIds.length === 0) {
          setJoinedGroups([]);
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://event-booking-server-wheat.vercel.app/groupsByIds",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: groupIds }),
          }
        );
        const groupsDetails = await res.json();
        setJoinedGroups(groupsDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // Leave group handler
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
        setJoinedGroups((prev) =>
          prev.filter((group) => group._id !== groupId)
        );
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] bg-white dark:bg-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-4"></div>
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">Loading joined events...</p>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>HobbyHub | Events You Joined</title>
      </Helmet>
      <div className="px-4 md:px-6 py-6 bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-2">
              Events You Joined
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage all events you've joined
            </p>
          </div>

          {/* Empty State */}
          {joinedGroups.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  No Joined Events Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Discover amazing events and join communities that interest you!
                </p>
                <Link to="/allGroups">
                  <Button className="px-8 py-3 text-lg">
                    🔍 Browse All Events
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Events Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedGroups.map((group) => (
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
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Joined
                    </div>
                    <div className="absolute top-3 left-3 bg-[#27548A] dark:bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
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
                        to={`/group/${group._id}`}
                        className="flex-1 bg-[#27548A] hover:bg-[#1e3d6b] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
                      >
                        <IoEyeOutline size={18} />
                        View
                      </Link>
                      <button
                        onClick={() => handleLeaveGroup(group._id, group.groupName)}
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
                      >
                        <IoLogOutOutline size={18} />
                        Leave
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

export default JoinedGroups;
