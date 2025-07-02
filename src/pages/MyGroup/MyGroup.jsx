import React, { useEffect, useState, useContext } from "react";
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

  if (!userEmail) return <p>Please login to see your Events.</p>;
  if (loading) return <p>Loading your Events...</p>;

  return (
    <div>
      <h2 className="text-3xl text-[#27548A]  font-bold my-4 text-center mx-4 md:mx-14">
        My Created Events
      </h2>
      <p className="text-gray-800 text-base text-center mb-4 mx-4 md:mx-14 max-w-7xl">
        Here are the hobby groups you have organized. Manage your events, update
        group details, and keep track of member participation all in one
        convenient place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mb-10">
        {createdGroups.length === 0 && <p>No groups created by you.</p>}
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

      <h2 className="text-3xl font-bold mb-4 mx-4 text-center md:mx-14">
        Events You Joined
      </h2>
      <p className="text-gray-800 text-base text-center mb-4 mx-4 md:mx-14 max-w-7xl">
        Discover and stay connected with the hobby groups you have joined.
        Engage in upcoming events, collaborate with fellow members, and never
        miss out on activities tailored to your interests. Manage your
        participation effortlessly in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mb-10">
        {joinedGroupsDetails.length === 0 && (
          <p>You haven't joined any groups yet.</p>
        )}
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

      {/* Update Modal */}
      {editingGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded shadow-lg w-full max-w-lg"
          >
            <h3 className="text-xl font-bold m-2 text-center ">Update Group</h3>

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

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setEditingGroup(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
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
    <div className="p-4 rounded-lg shadow-md bg-white flex flex-col h-full">
      {/* Group Image */}
      <img
        src={group.image}
        alt={group.groupName || "Group image"}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      {/* Group Name */}
      <h3 className="text-xl font-semibold text-gray-900 truncate">
        {group.groupName}
      </h3>

      {/* Group Description */}
      <p className="text-gray-700 text-sm mt-1 mb-1 line-clamp-2">
        {group.description?.split(" ").slice(0, 10).join(" ")}
        {group.description?.split(" ").length > 10 ? "..." : ""}
      </p>

      {/* Group Details */}
      <div className=" text-sm text-gray-700">
        <div className="flex">
          <span className="font-medium text-gray-900">Location : </span>
          <span className="flex-1"> {group.location}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900">Max Members :</span>
          <span>{group.maxMembers}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900">Date :</span>
          <span>
            {group.formattedDate} {group.formatHour}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-900 ">Day : </span>
          <span> {group.day}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col gap-2 pt-1">
        <Button
          onClick={() => handleEditClick(group)}
          className={`btn btn-sm btn-primary w-full ${
            isJoinedButNotCreator ? "btn-disabled" : ""
          }`}
          disabled={isJoinedButNotCreator}
          title={
            isJoinedButNotCreator
              ? "You joined this group, editing disabled"
              : ""
          }
        >
          Update
        </Button>
        <button
          onClick={handleDelete}
          className="btn btn-sm btn-error text-white w-full"
          title={isCreator ? "" : "Leave this group"}
        >
          {isCreator ? "Delete" : "Leave"}
        </button>
      </div>
    </div>
  );
  
};

export default MyGroup;
