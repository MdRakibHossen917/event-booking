import React, { useEffect, useState, useContext } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router"; 
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import Button from "./Button";

const LatestCard = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://event-booking-server-wheat.vercel.app/groups")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data);
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
        `https://event-booking-server-wheat.vercel.app/user-joined-groups?email=${user.email}`
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

    fetch("https://event-booking-server-wheat.vercel.app/joinGroup", {
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
      <h2 className="text-3xl font-bold text-center mx-8 text-gray-800">
        <span className="text-red-600">Explore</span> Recent Events
      </h2>
      <p className="text-base text-gray-600 text-center mb-6 mx-8 max-w-7xl">
        Stay in the loop with the latest hobby group events and activities.
        Discover new experiences, join exciting meetups, and expand your
        community connections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mb-4">
        {groups.map((group) => {
          const alreadyJoined = joinedGroups.includes(group._id.toString());
          return (
            <div
              key={group._id}
              className="p-4 rounded shadow flex flex-col h-full"
            >
              <img
                src={group.image}
                alt={group.groupName}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl text-gray-900 font-bold mt-2">
                {group.groupName}
              </h3>
              <p className="flex text-gray-800 font-semibold items-center">
                <IoLocationOutline size={20} className="text-blue-600 mr-1" />
                {group.location}
              </p>
              <p className="text-gray-700 text-sm">
                {group.description?.split(" ").slice(0, 10).join(" ")}...
              </p>

              {/* Fixed bottom buttons */}
              <div className="mt-auto space-y-2 pt-4">
                <Link to={`/group/${group._id}`}>
                  <Button className=" btn-sm w-full">View Details</Button>
                </Link>
                <Button
                  onClick={() => handleJoinGroup(group)}
                  className="btn-sm mt-1 w-full"
                  disabled={alreadyJoined}
                >
                  {alreadyJoined ? "Joined" : "Join Now"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Link to="/allGroups">
          <Button className="btn my-4 w-1/2 md:w-1/3">See More..</Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestCard;
