import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";
import DaysLeft from "../../shared/DaysLeft";
import { IoLocationOutline } from "react-icons/io5";

const AllGroups = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
    fetch("https://event-booking-server-l2liirj9x.vercel.app/groups")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

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

  if (loading) return <p>Loading Events...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 mx-4 mt-4 md:mx-14">
        All of Events
      </h2>
      <p className="text-gray-600 text-base mb-4 mx-4 md:mx-14 max-w-7xl">
        Browse through all available hobby groups in the community. Discover new
        interests, connect with like-minded people, and join groups that inspire
        you.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mb-10">
        {groups
          .filter((group) => {
            const today = new Date().setHours(0, 0, 0, 0);
            const eventDate = new Date(group.formattedDate).setHours(
              0,
              0,
              0,
              0
            );
            return eventDate >= today;
          })
          .map((group) => {
            const isCreator = group.userEmail === user?.email;
            const alreadyJoined = joinedGroups.includes(group._id.toString());

            return (
              <div
                key={group._id}
                className="p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  <img
                    src={group.image}
                    alt={group.groupName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full shadow-sm tracking-wide">
                    <DaysLeft eventDate={group.formattedDate} />
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mt-4 mb-1 text-gray-800">
                  {group.groupName}
                </h3>

                <p className="text-gray-600 flex items-center mb-3">
                  <strong>
                    {" "}
                    <IoLocationOutline size={25} className="text-blue-600" />
                  </strong>
                  {group.location}
                </p>

                <Link to={`/group/${group._id}`}>
                  <button className="btn btn-sm w-full mb-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none hover:from-blue-600 hover:to-indigo-700">
                    View Details
                  </button>
                </Link>

                <button
                  onClick={() => handleJoinGroup(group)}
                  disabled={isCreator || alreadyJoined}
                  className={`btn btn-sm w-full
    ${
      isCreator
        ? "bg-gray-400 cursor-not-allowed text-gray-700"
        : alreadyJoined
        ? "bg-green-600 hover:bg-green-700 text-white cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }
  `}
                >
                  {isCreator
                    ? "Your Event"
                    : alreadyJoined
                    ? "Joined"
                    : "Join Event"}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllGroups;
