import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { IoLocationOutline } from "react-icons/io5";
import Button from "./Button";
import creativeImage from "../assets/creative.jpg";

const UpcomingEventCountdown = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://event-booking-server-wheat.vercel.app/groups")
      .then((res) => res.json())
      .then((data) => {
        // Filter events that are upcoming (date >= today) and sort by date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = data
          .filter((group) => {
            if (!group.formattedDate) return false;
            const eventDate = new Date(group.formattedDate);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
          })
          .sort((a, b) => {
            const dateA = new Date(a.formattedDate);
            const dateB = new Date(b.formattedDate);
            return dateA - dateB;
          })
          .slice(0, 4); // Get first 3-4 upcoming events

        setUpcomingEvents(upcoming);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="my-12">
      <div className="w-11/12 mx-auto px-4">
        <div className="bg-gradient-to-br from-[#F5FAFF] dark:from-gray-800 to-white dark:to-gray-900 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side - Image */}
          <div className="relative overflow-hidden">
            <img
              src={creativeImage}
              alt="Creative Events"
              className="w-full h-full min-h-[400px] object-cover lg:h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#27548A]/20 to-transparent lg:hidden"></div>
          </div>

          {/* Right Side - Events */}
          <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-[#F5FAFF] dark:from-gray-800 to-white dark:to-gray-900">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#27548A] dark:text-blue-400 mb-3">
                Events are Coming
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
                Discover exciting upcoming events and join the community
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-500 dark:text-gray-400">Loading events...</div>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No upcoming events at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {upcomingEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#27548A]/30 dark:hover:border-blue-500/30 group"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Event Image */}
                      <div className="w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={event.image || "https://via.placeholder.com/300"}
                          alt={event.groupName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1 group-hover:text-[#27548A] dark:group-hover:text-blue-400 transition-colors">
                          {event.groupName}
                        </h3>
                        
                        <div className="space-y-1 mb-3">
                          <p className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <IoLocationOutline size={16} className="text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" />
                            <span className="truncate">{event.location || "Location TBD"}</span>
                          </p>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">Date:</span>{" "}
                            {formatDate(event.formattedDate)}
                            {event.formatHour && ` at ${event.formatHour}`}
                          </p>
                          
                          {event.day && (
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              <span className="font-semibold text-gray-900 dark:text-gray-100">Day:</span> {event.day}
                            </p>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {event.description?.split(" ").slice(0, 15).join(" ")}
                          {event.description?.split(" ").length > 15 ? "..." : ""}
                        </p>

                        <Link to={`/group/${event._id}`}>
                          <Button className="w-full sm:w-auto px-4 py-2 text-sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventCountdown;
