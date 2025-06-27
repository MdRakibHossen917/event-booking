import React, { useEffect, useState, useContext } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { FaInternetExplorer } from "react-icons/fa";

const LatestCard = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://event-booking-server-l2liirj9x.vercel.app/groups")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://event-booking-server-l2liirj9x.vercel.app/user-joined-groups?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setJoinedGroups(data.map((g) => g.groupId.toString()));
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  const handleJoinGroup = (group) => {
    if (!user?.email) {
      return Swal.fire(
        "Login Required",
        "Please log in to join a group",
        "warning"
      );
    }

    const joinedGroup = {
      groupId: group._id,
      groupName: group.groupName,
      userEmail: user.email,
      joinedAt: new Date(),
    };

    fetch("https://event-booking-server-l2liirj9x.vercel.app/joinGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinedGroup),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Joined!", "You have joined this group.", "success");
          setJoinedGroups((prev) => [...prev, group._id.toString()]);
        } else {
          Swal.fire("Notice", data.message || "Already joined.", "info");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong.", "error");
      });
  };

  if (loading) return <p>Loading latest events...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold   text-center mx-8 text-gray-800">
        <span className="text-red-600">Explore</span> Recent Events
      </h2>
      <p className="text-base text-gray-600 text-center mb-6 mx-8 max-w-7xl">
        Stay in the loop with the latest hobby group events and activities.
        Discover new experiences, join exciting meetups, and expand your
        community connections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mb-10">
        {groups.map((group) => {
          const alreadyJoined = joinedGroups.includes(group._id.toString());
          return (
            <div key={group._id} className="p-4 rounded shadow">
              <img
                src={group.image}
                alt={group.groupName}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{group.groupName}</h3>
              <p className="flex items-center">
                <IoLocationOutline size={25} className="text-blue-600 mb-1" />
                {group.location}
              </p>

              <Link to={`/group/${group._id}`}>
                <button className="btn btn-sm w-full mb-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none hover:from-blue-600 hover:to-indigo-700">
                  View Details
                </button>
              </Link>

              <button
                onClick={() => handleJoinGroup(group)}
                className="btn btn-sm btn-primary w-full"
                disabled={alreadyJoined}
              >
                {alreadyJoined ? "Joined" : "Join"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <Link to="/allGroups">
          <button className="btn btn-primary my-6">See More..</button>
        </Link>
      </div>
    </div>
  );
};

export default LatestCard;
