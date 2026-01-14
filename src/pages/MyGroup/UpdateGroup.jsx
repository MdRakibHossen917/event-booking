import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    // Try fetching single group first
    fetch(`https://event-booking-server-wheat.vercel.app/groups/${id}`)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        } else {
          // If not JSON, try fetching all groups and find the one
          throw new Error("Single group endpoint not available, fetching all groups");
        }
      })
      .then((data) => {
        if (data) {
          setGroupData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        // Fallback: fetch all groups and find the one with matching id
        console.log("Trying fallback: fetching all groups");
        fetch("https://event-booking-server-wheat.vercel.app/groups")
          .then((res) => {
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              throw new Error("Server returned non-JSON response");
            }
            return res.json();
          })
          .then((allGroups) => {
            const groupsArray = Array.isArray(allGroups) ? allGroups : [];
            const group = groupsArray.find((g) => g._id === id);
            if (group) {
              setGroupData(group);
              setLoading(false);
            } else {
              throw new Error("Group not found");
            }
          })
          .catch((fetchErr) => {
            console.error("Error fetching group:", fetchErr);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Could not load group data. Please try again.",
            });
            setLoading(false);
            navigate("/myGroup");
          });
      });
  }, [id, navigate]);

  const handleUpdate = async (e) => {
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
    };

    try {
      // Get Firebase token
      const token = await user.getIdToken();

      // Update event
      const res = await fetch(
        `https://event-booking-server-wheat.vercel.app/groups/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedGroup),
        }
      );

      // Handle errors
      if (res.status === 401 || res.status === 403) {
        alert("Unauthorized: Please log in again");
        return;
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Server error:", errorData);
        Swal.fire("Error", errorData.message || "Failed to update event", "error");
        return;
      }

      // Success
      const data = await res.json().catch(() => ({}));
      Swal.fire({
        icon: "success",
        title: "Event updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/myGroup");
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "Failed to update event. Please try again.", "error");
    }
  };

  if (loading) return (
    <section className="py-12 bg-white dark:bg-gray-900 min-h-[60vh] flex items-center justify-center">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-4"></div>
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">Loading group details...</p>
          </div>
        </div>
      </div>
    </section>
  );
  if (!groupData) return (
    <section className="py-12 bg-white dark:bg-gray-900 min-h-[60vh] flex items-center justify-center">
      <div className="w-11/12 mx-auto">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">No group data found.</p>
        </div>
      </div>
    </section>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Group</h2>

      <form onSubmit={handleUpdate}>
        <label className="label font-semibold">Group Name</label>
        <input
          name="groupName"
          defaultValue={groupData.groupName}
          required
          className="input input-bordered w-full mb-4"
        />

        <label className="label font-semibold">Category</label>
        <select
          name="category"
          defaultValue={groupData.category}
          className="input input-bordered w-full mb-4"
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

        <label className="label font-semibold">Description</label>
        <textarea
          name="description"
          defaultValue={groupData.description}
          required
          className="textarea textarea-bordered w-full mb-4"
        />

        <label className="label font-semibold">Location</label>
        <input
          name="location"
          defaultValue={groupData.location}
          required
          className="input input-bordered w-full mb-4"
        />

        <label className="label font-semibold">Max Members</label>
        <input
          name="maxMembers"
          type="number"
          defaultValue={groupData.maxMembers}
          required
          className="input input-bordered w-full mb-4"
        />

        <label className="label font-semibold">Date (yyyy-mm-dd)</label>
        <input
          name="formattedDate"
          type="date"
          defaultValue={groupData.formattedDate}
          required
          className="input input-bordered w-full mb-4"
        />

        <label className="label font-semibold">Time (e.g. 7:00 PM)</label>
        <input
          name="formatHour"
          defaultValue={groupData.formatHour}
          required
          className="input input-bordered w-full mb-4"
        />

        <label className="label font-semibold">Day</label>
        <select
          name="day"
          defaultValue={groupData.day}
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

        <label className="label font-semibold">Image URL</label>
        <input
          name="image"
          defaultValue={groupData.image}
          className="input input-bordered w-full mb-6"
        />

        <button 
          type="submit" 
          className="w-full py-3 bg-[#27548A] text-white rounded-lg font-semibold hover:bg-[#1e3d6b] transition-all duration-200 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#27548A] focus:ring-offset-2"
        >
          Update Group
        </button>
      </form>
    </div>
  );
};

export default UpdateGroup;
