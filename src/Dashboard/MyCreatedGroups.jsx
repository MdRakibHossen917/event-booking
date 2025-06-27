import React, { useEffect, useState, useContext } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const MyCreatedGroups = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyGroups = () => {
    if (!user?.email) return;
    fetch(
      `https://event-booking-server-l2liirj9x.vercel.app/groups?userEmail=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyGroups();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this group?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://event-booking-server-l2liirj9x.vercel.app/groups/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", "Group deleted successfully.", "success");
              fetchMyGroups();
            } else {
              Swal.fire(
                "Error",
                data.message || "Failed to delete group",
                "error"
              );
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete group", "error");
          });
      }
    });
  };

  if (loading) return <p>Loading your groups...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Created Groups</h1>
      {groups.length === 0 && <p>No groups created by you.</p>}
      <ul className="space-y-4">
        {groups.map((group) => (
          <li
            key={group._id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{group.groupName}</h3>
              <p>{group.description}</p>
              <p>
                <strong>Date:</strong> {group.formattedDate} {group.formatHour}
              </p>
            </div>
            <button
              onClick={() => handleDelete(group._id)}
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCreatedGroups;
