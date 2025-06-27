import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetch(`https://event-booking-server-l2liirj9x.vercel.app/groups`)
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((item) => item._id === id);
        setGroup(selected);
      });
  }, [id]);

  if (!group) return <p>Loading group details...</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded p-6 mt-6">
      <img
        src={group.image}
        alt={group.groupName}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-2xl font-bold mt-4">{group.groupName}</h2>
      <p className="mt-2">
        <strong>Location:</strong> {group.location}
      </p>
      <p>
        <strong>Day:</strong> {group.day}
      </p>
      <p>
        <strong>Date:</strong> {group.formattedDate} {group.formatHour}
      </p>
      <p>
        <strong>Max Members:</strong> {group.maxMembers}
      </p>
      <p className="mt-2">{group.description}</p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
        <div className="  ">
          <img
            src={
              group.creatorImage ||
              "https://via.placeholder.com/40?text=No+Image"
            }
            alt={group.creatorName || "Unknown User"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-semibold">{group.creatorName || "Unknown User"}</p>
        </div>
        <div>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
