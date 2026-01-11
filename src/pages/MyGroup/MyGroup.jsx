import React, { useEffect, useState, useContext } from "react";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Button from "../../shared/Button";

const MyGroup = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const [createdGroups, setCreatedGroups] = useState([]);
  const [joinedGroupIds, setJoinedGroupIds] = useState([]);
  const [joinedGroupsDetails, setJoinedGroupsDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGroup, setEditingGroup] = useState(null);

  const fetchCreatedGroups = () => {
    if (!userEmail) return;
    fetch(
      ` https://event-booking-server-wheat.vercel.app/groups?userEmail=${userEmail}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCreatedGroups(data);
      })
      .catch((err) => console.error(err));
  };

  const fetchJoinedGroupIds = () => {
    if (!userEmail) return;
    fetch(
      `https://event-booking-server-wheat.vercel.app/user-joined-groups?email=${userEmail}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJoinedGroupIds(data.map((g) => g.groupId));
      })
      .catch((err) => console.error(err));
  };

  const fetchJoinedGroupsDetails = (ids) => {
    if (!ids || ids.length === 0) {
      setJoinedGroupsDetails([]);
      setLoading(false);
      return;
    }

    fetch(`https://event-booking-server-wheat.vercel.app/groupsByIds`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    })
      .then((res) => res.json())
      .then((data) => {
        setJoinedGroupsDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!userEmail) return;

    setLoading(true);
    fetchCreatedGroups();
    fetchJoinedGroupIds();
  }, [userEmail]);

  useEffect(() => {
    if (joinedGroupIds.length > 0) {
      fetchJoinedGroupsDetails(joinedGroupIds);
    } else {
      setJoinedGroupsDetails([]);
      setLoading(false);
    }
  }, [joinedGroupIds]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(` https://event-booking-server-wheat.vercel.app/groups/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", data.message, "success");
              fetchCreatedGroups();
              fetchJoinedGroupIds();
            } else {
              Swal.fire("Error", data.message || "Failed to delete", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete group", "error");
          });
      }
    });
  };

  const handleLeave = (groupId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to leave this group?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, leave group!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(` https://event-booking-server-wheat.vercel.app/leaveGroup`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupId,
            userEmail,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire(
                "Left Group!",
                "You left the group successfully.",
                "success"
              );
              fetchJoinedGroupIds();
            } else {
              Swal.fire(
                "Error",
                data.message || "Failed to leave group",
                "error"
              );
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to leave group", "error");
          });
      }
    });
  };

  const handleEditClick = (group) => setEditingGroup(group);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedGroup = {
      groupName: form.groupName.value,
      category: form.category.value,
      description: form.description.value,
      location: form.location.value,
      maxMembers: parseInt(form.maxMembers.value),
      image: form.image.value,
      formattedDate: form.formattedDate.value,
      formatHour: form.formatHour.value,
      day: form.day.value,
      userEmail: userEmail,
    };

    fetch(
      ` https://event-booking-server-wheat.vercel.app/groups/${editingGroup._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGroup),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Updated!", "Group updated successfully.", "success");
          setEditingGroup(null);
          fetchCreatedGroups();
        } else {
          Swal.fire("Error", data.message || "Failed to update", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update group", "error");
      });
  };

  if (!userEmail) return (
    <section className="py-12 bg-white dark:bg-gray-900 min-h-[60vh] flex items-center justify-center">
      <div className="w-11/12 mx-auto">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">Please login to see your Events.</p>
        </div>
      </div>
    </section>
  );
  if (loading) return (
    <section className="py-12 bg-white dark:bg-gray-900 min-h-[60vh] flex items-center justify-center">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-4"></div>
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">Loading your Events...</p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Helmet>
        <title>HobbyHub | My Groups</title>
      </Helmet>
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-11/12 mx-auto">
          {/* Main Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#27548A] dark:text-blue-400 font-bold mb-3">
              My Events
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-3xl mx-auto">
              Manage your created events and track all events you've joined in one place
            </p>
          </div>

          {/* Two Column Layout - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Side - My Created Events */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-[#27548A] dark:text-blue-400 mb-2">
                  My Created Events
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage events you've organized and created
                </p>
              </div>

              {createdGroups.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-5xl mb-3">📅</div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    No Events Created Yet
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Start creating amazing events!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                  {createdGroups.map((group) => (
                    <GroupCard
                      key={group._id}
                      group={group}
                      isCreator={true}
                      userEmail={userEmail}
                      handleDelete={handleDelete}
                      handleEditClick={handleEditClick}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Events You Joined */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-[#27548A] dark:text-blue-400 mb-2">
                  Events You Joined
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track all events you've joined and participated in
                </p>
              </div>

              {joinedGroupsDetails.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-5xl mb-3">🎯</div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    No Joined Events Yet
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Discover and join amazing events!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                  {joinedGroupsDetails.map((group) => (
                    <GroupCard
                      key={group._id}
                      group={group}
                      isCreator={false}
                      userEmail={userEmail}
                      handleDelete={() => handleLeave(group._id)}
                      handleEditClick={handleEditClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Update Modal */}
      {editingGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-4 text-center text-[#27548A] dark:text-blue-400">Update Event</h3>

            <input
              type="text"
              name="groupName"
              defaultValue={editingGroup.groupName}
              required
              placeholder="Group Name"
              className="input input-bordered  w-full mb-2"
            />
            <select
              name="category"
              defaultValue={editingGroup.category}
              className="input input-bordered w-full mb-2"
            >
              <option>Drawing & Painting</option>
              <option>Photography</option>
              <option>Video Gaming</option>
              <option>Fishing</option>
              <option>Running</option>
              <option>Cooking</option>
              <option>Reading</option>
              <option>Writing</option>
            </select>
            <textarea
              name="description"
              defaultValue={editingGroup.description}
              required
              className="textarea textarea-bordered w-full mb-2"
              placeholder="Description"
            />
            <input
              type="text"
              name="location"
              defaultValue={editingGroup.location}
              required
              placeholder="Location"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="number"
              name="maxMembers"
              defaultValue={editingGroup.maxMembers}
              required
              placeholder="Max Members"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="image"
              defaultValue={editingGroup.image}
              placeholder="Image URL"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="formattedDate"
              defaultValue={editingGroup.formattedDate}
              placeholder="Date"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="formatHour"
              defaultValue={editingGroup.formatHour}
              placeholder="Time"
              className="input input-bordered w-full mb-2"
            />
            <select
              name="day"
              defaultValue={editingGroup.day}
              className="input input-bordered w-full mb-4"
            >
              <option>Sunday</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
            </select>

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setEditingGroup(null)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 hover:shadow-md active:scale-95"
              >
                Cancel
              </button>
              <Button type="submit" className="px-6 py-2">
                Update
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const GroupCard = ({
  group,
  isCreator,
  userEmail,
  handleDelete,
  handleEditClick,
}) => {
  const isJoinedButNotCreator = !isCreator && group.userEmail !== userEmail;

  return (
    <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-900 flex flex-col h-full border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      {/* Group Image */}
      <div className="relative h-32 overflow-hidden rounded-lg mb-3">
        <img
          src={group.image || "https://via.placeholder.com/400x300?text=Event+Image"}
          alt={group.groupName || "Group image"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Group Name */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate mb-1">
        {group.groupName}
      </h3>

      {/* Group Description */}
      <p className="text-gray-600 dark:text-gray-400 text-xs mb-2 line-clamp-2">
        {group.description?.split(" ").slice(0, 12).join(" ")}
        {group.description?.split(" ").length > 12 ? "..." : ""}
      </p>

      {/* Group Details */}
      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 mb-3">
        <div className="flex items-start">
          <span className="font-semibold text-gray-900 dark:text-gray-100 mr-1">Location:</span>
          <span className="flex-1 line-clamp-1">{group.location || "TBD"}</span>
        </div>
        {group.formattedDate && (
          <div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Date: </span>
            <span>{group.formattedDate} {group.formatHour || ""}</span>
          </div>
        )}
        {group.day && (
          <div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Day: </span>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-[#27548A] dark:text-blue-400 px-2 py-0.5 rounded text-xs">
              {group.day}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        {isCreator && (
          <Button
            onClick={() => handleEditClick(group)}
            className="w-full py-2 text-xs"
          >
            Update
          </Button>
        )}
        <button
          onClick={handleDelete}
          className="w-full py-2 text-xs bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          title={isCreator ? "Delete this event" : "Leave this event"}
        >
          {isCreator ? "Delete" : "Leave"}
        </button>
      </div>
    </div>
  );
  
};

export default MyGroup;
