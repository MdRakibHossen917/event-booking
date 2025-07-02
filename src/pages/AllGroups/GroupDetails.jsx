import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../shared/Button";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetch(` https://event-booking-server-wheat.vercel.app/groups`)
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((item) => item._id === id);
        setGroup(selected);
      });
  }, [id]);

  if (!group) return <p>Loading group details...</p>;

  return (
    <div className="max-w-4xl mx-auto border shadow-lg rounded p-6 mt-6">
      <img
        src={group.image}
        alt={group.groupName}
        className="w-full h-80 object-cover rounded"
      />
      <h2 className="text-2xl text-gray-800 font-bold mt-4">
        {group.groupName}
      </h2>
      <p className="mt-2 text-gray-800 ">
        <strong>Location:</strong> {group.location}
      </p>
      <p className="text-gray-800 ">
        <strong>Day:</strong> {group.day}
      </p>
      <p className="text-gray-800 ">
        <strong>Date:</strong> {group.formattedDate} {group.formatHour}
      </p>
      <p className="text-gray-800 ">
        <strong>Max Members:</strong> {group.maxMembers}
      </p>
      <p className="mt-2 text-gray-800 ">{group.description}</p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
        <div className="  ">
          <h2 className="text-gray-900 font-extrabold text-xl underline mb-1">Guide Info </h2>
          <img
            src={
              group.creatorImage ||
              "https://via.placeholder.com/40?text=No+Image"
            }
            alt={group.creatorName || "Unknown User"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-semibold text-gray-900">
            Name: {group.creatorName || "Unknown User"}
          </p>
        </div>
        <div>
          <Button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary"
          >
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
