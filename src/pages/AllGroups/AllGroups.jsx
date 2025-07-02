import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";
import DaysLeft from "../../shared/DaysLeft";
import { IoLocationOutline } from "react-icons/io5";
import Button from "../../shared/Button";

const AllGroups = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
    fetch("https://event-booking-server-wheat.vercel.app/groups")
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
        ` https://event-booking-server-wheat.vercel.app/user-joined-groups?email=${user.email}`
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

    fetch(" https://event-booking-server-wheat.vercel.app/joinGroup", {
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
      <h2 className="text-3xl text-[#27548A] text-center  font-bold mb-4 mx-4 mt-6 md:mx-14">
        All of Events
      </h2>
      <p className="text-gray-700 text-center text-base mb-4 mx-4 md:mx-14 max-w-7xl">
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
                  <div className="absolute top-2 right-2 bg-[#27548A] text-white text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full shadow-sm tracking-wide">
                    <DaysLeft eventDate={group.formattedDate} />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-2  text-gray-800">
                  {group.groupName}
                </h3>

                <p className="text-gray-600 flex items-center">
                  <strong>
                    {" "}
                    <IoLocationOutline size={25} className="text-blue-600" />
                  </strong>
                  {group.location}
                </p>
                {/* Group Description */}
                <p className="text-gray-700 text-sm mt-1 mb-1 line-clamp-2">
                  {group.description?.split(" ").slice(0, 10).join(" ")}
                  {group.description?.split(" ").length > 10 ? "..." : ""}
                </p>

                <Link to={`/group/${group._id}`}>
                  <Button className="btn-sm w-full text-white ">
                    View Details
                  </Button>
                </Link>

                <button
                  onClick={() => handleJoinGroup(group)}
                  disabled={isCreator || alreadyJoined}
                  className={`btn btn-sm w-full mt-1 border-none
    ${
      isCreator
        ? "bg-gray-400 cursor-not-allowed text-gray-700"
        : alreadyJoined
        ? "bg-green-600 hover:bg-green-700 text-white cursor-not-allowed"
        : "bg-[#27548A]  hover:bg-[#000B58] text-white"
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
