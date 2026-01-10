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

  if (!group) return <p className="text-center text-gray-600 dark:text-gray-400">Loading group details...</p>;

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="w-11/12 mx-auto">
        <div className="max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-6 bg-white dark:bg-gray-800">
          <img
            src={group.image}
            alt={group.groupName}
            className="w-full h-80 object-cover rounded-lg"
          />
          <h2 className="text-2xl md:text-3xl text-gray-900 dark:text-gray-100 font-bold mt-4">
            {group.groupName}
          </h2>
          <div className="mt-4 space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-gray-100">Location:</strong> {group.location}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-gray-100">Day:</strong> {group.day}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-gray-100">Date:</strong> {group.formattedDate} {group.formatHour}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-gray-100">Max Members:</strong> {group.maxMembers}
            </p>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{group.description}</p>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div>
              <h2 className="text-gray-900 dark:text-gray-100 font-extrabold text-xl underline mb-2">Guide Info</h2>
              <div className="flex items-center gap-3">
                <img
                  src={
                    group.creatorImage ||
                    "https://via.placeholder.com/40?text=No+Image"
                  }
                  alt={group.creatorName || "Unknown User"}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#27548A] dark:border-blue-400"
                />
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {group.creatorName || "Unknown User"}
                </p>
              </div>
            </div>
            <div>
              <Button
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 text-base"
              >
                ← Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupDetails;
