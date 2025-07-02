import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const JoinedGroups = () => {
  const { user } = useContext(AuthContext);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      ` https://event-booking-server-wheat.vercel.app/user-joined-groups?email=${user.email}`
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
          " https://event-booking-server-wheat.vercel.app/groupsByIds",
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
  const handleLeaveGroup = (groupId) => {
    fetch(" https://event-booking-server-wheat.vercel.app/leaveGroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupId, userEmail: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Left Group", "You have left the group.", "success");
          // Update UI - remove left group from state
          setJoinedGroups((prev) =>
            prev.filter((group) => group._id !== groupId)
          );
        } else {
          Swal.fire("Error", data.message || "Failed to leave group", "error");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong", "error");
      });
  };

  if (loading) return <p>Loading joined groups...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Joined Groups</h1>
      {joinedGroups.length === 0 && <p>You haven't joined any groups yet.</p>}
      <ul className="space-y-4">
        {joinedGroups.map((group) => (
          <li key={group._id} className="border p-4 rounded shadow">
            <h3 className="font-semibold text-lg">{group.groupName}</h3>
            <p>{group.description}</p>
            <p>
              <strong>Date:</strong> {group.formattedDate} {group.formatHour}
            </p>

            {/* Leave Group Button */}
            <button
              onClick={() => handleLeaveGroup(group._id)}
              className="btn btn-error mt-2"
            >
              Leave Group
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JoinedGroups;
