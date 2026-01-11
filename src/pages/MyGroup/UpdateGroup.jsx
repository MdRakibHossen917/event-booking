import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(` https://event-booking-server-wheat.vercel.app/groups/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch group data");
        return res.json();
      })
      .then((data) => {
        setGroupData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Could not load group data", "error");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
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

    fetch(` https://event-booking-server-wheat.vercel.app/groups/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGroup),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update group");
        return res.json();
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Group updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/myGroup");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update group", "error");
      });
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
