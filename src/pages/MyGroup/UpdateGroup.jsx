import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateGroup = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/groups/${id}`)
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

    fetch(`http://localhost:5000/groups/${id}`, {
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
        navigate("/myGroups");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update group", "error");
      });
  };

  if (loading) return <p>Loading group details...</p>;
  if (!groupData) return <p>No group data found.</p>;

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

        <button type="submit" className="btn btn-primary w-full">
          Update Group
        </button>
      </form>
    </div>
  );
};

export default UpdateGroup;
