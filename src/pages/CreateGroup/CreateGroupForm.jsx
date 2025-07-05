import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Button from "../../shared/Button";

const CreateGroupForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const newGroup = {
      ...formData,
      maxMembers: parseInt(formData.maxMembers),
      creatorName: user?.displayName || user?.email,
      creatorImage:
        user?.photoURL || "https://via.placeholder.com/40?text=No+Image",
      userEmail: user?.email,
    };

    fetch(" https://event-booking-server-wheat.vercel.app/createGroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGroup),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Group Created!",
            text: "Your hobby group has been created successfully.",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
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

            navigate("/myGroup");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to create group. Please try again.",
          });
        }
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again.",
        });
      });
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

        {/* Image URL */}
        <div className="md:col-span-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="Link to group image"
            disabled={loading}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
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
        disabled={loading}
        className={`btn btn-primary w-full my-6 ${loading ? "loading" : ""}`}
      >
        {loading ? "Creating..." : "Create Group"}
      </Button>
    </form>
  );
};

export default CreateGroupForm;
