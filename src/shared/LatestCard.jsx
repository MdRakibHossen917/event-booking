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
  const scrollContainerRef = React.useRef(null);

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

  if (loading) return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-4"></div>
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">Loading latest events...</p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="py-8 md:py-16 bg-white dark:bg-gray-900">
      <div className="w-11/12 mx-auto">
        <div className="text-center mx-auto max-w-3xl px-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold -mt-12 text-gray-800 dark:text-gray-100 mb-2 md:mb-4">
          <span className="text-[#27548A] dark:text-blue-400">Explore</span> Recent Events
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          Stay in the loop with the latest hobby group events and activities.
          Discover new experiences, join exciting meetups, and expand your
          community connections.
        </p>
      </div>

      <div className="px-5   mb-4 md:mb-8 overflow-hidden md:px-10 -mx-[4.5%] md:mx-0">
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 md:gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory md:-mx-4 md:px-4"
          style={{
            paddingLeft: 'calc((100vw - 320px) / 2)',
            paddingRight: 'calc((100vw - 320px) / 2)',
          }}
        >
          {groups.map((group) => {
            const alreadyJoined = joinedGroups.includes(group._id.toString());
            return (
              <div
                key={group._id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700 hover:border-[#27548A]/20 dark:hover:border-blue-500/30 group flex-shrink-0 w-[320px] md:w-[350px] lg:w-[380px] snap-start"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={group.image}
                    alt={group.groupName}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* 50% Top Section Overlay */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/10 to-transparent"></div>
                  
                   {/* 50% Bottom Section with Join Button */}
                   <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 via-black/40 to-transparent flex items-center justify-end pb-44 pr-0">
                     <Button
                       onClick={(e) => {
                         e.preventDefault();
                         handleJoinGroup(group);
                       }}
                       className={`px-4 py-2 text-sm font-semibold rounded-lg  transition-all duration-300 ${
                         alreadyJoined
                           ? "bg-gray-300/90 dark:bg-gray-700/90 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           : "bg-[#27548A] hover:bg-[#1e3d6b] text-white hover:scale-105"
                       }`}
                       disabled={alreadyJoined}
                     >
                       {alreadyJoined ? "✓ Joined" : "Join Now"}
                     </Button>
                   </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1 group-hover:text-[#27548A] dark:group-hover:text-blue-400 transition-colors">
                    {group.groupName}
                  </h3>
                  
                  <p className="flex text-gray-700 dark:text-gray-300 font-medium items-center mb-1 md:mb-3 text-sm">
                    <IoLocationOutline size={18} className="text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" />
                    <span className="truncate">{group.location}</span>
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1 md:mb-4 line-clamp-2 flex-grow">
                    {group.description?.split(" ").slice(0, 12).join(" ")}...
                  </p>

                  {/* Buttons */}
                  <div className="mt-auto flex flex-col gap-1 pt-2">
                    <Link to={`/group/${group._id}`}>
                      <Button className="w-full py-2.5 text-sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        <div className="text-center mt-8">
          <Link to="/allGroups">
            <Button className="px-8 py-3 text-lg w-auto inline-block">
              See More Events →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestCard;
