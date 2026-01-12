import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Mail } from "lucide-react";
import Button from "./Button";

const Banner = () => {
  const [stats, setStats] = useState({
    groups: 0,
    members: 0,
    events: 0,
    cities: 0,
  });

  useEffect(() => {
    // Fetch groups data
    fetch("https://event-booking-server-wheat.vercel.app/groups")
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }
        return res.json();
      })
      .then((groups) => {
        const groupsData = Array.isArray(groups) ? groups : [];
        
        // Count active groups
        const activeGroups = groupsData.length || 0;

        // Count total events - groups themselves are events, so count all groups
        const totalEvents = groupsData.length || 0;

        // Count unique cities
        const uniqueCities = new Set(
          groupsData
            .map((group) => group.location)
            .filter((location) => location)
        ).size;

        // Fetch total users count (members)
        fetch("https://event-booking-server-wheat.vercel.app/totalUsers")
          .then((res) => {
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              return { total: 0 };
            }
            return res.json();
          })
          .then((usersData) => {
            const totalMembers = usersData?.total || 0;

            setStats({
              groups: activeGroups,
              members: totalMembers,
              events: totalEvents,
              cities: uniqueCities,
            });
          })
          .catch((err) => {
            console.error("Error fetching total users:", err);
            // Set stats even if members count fails
            setStats({
              groups: activeGroups,
              members: 0,
              events: totalEvents,
              cities: uniqueCities,
            });
          });
      })
      .catch((err) => {
        console.error("Error fetching groups:", err);
        setStats({
          groups: 0,
          members: 0,
          events: 0,
          cities: 0,
        });
      });
  }, []);

  // Format numbers with K/M suffixes
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K+`;
    }
    return `${num}+`;
  };

  return (
    <section className="relative -mt-6 bg-[#101828] dark:bg-gray-900 py-8 md:py-16 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#27548A]/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#27548A]/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-11/12 mx-auto max-w-7xl px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Text Section */}
          <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-[#27548A] dark:text-blue-400"
          >
           Find Your People
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-lg"
          >
            <span className="text-gray-800 dark:text-gray-200 font-semibold">
              Join, create and participate
            </span>{" "}
            in events that match your interests. From painting to hiking, find
            your tribe today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              to="/allGroups"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#27548A] to-[#1e3d6b] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#27548A]/40"
            >
              <span>Explore Groups</span>
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/createGroup"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              <Mail className="mr-2" size={20} />
              <span>Create Group</span>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {/* Stat 1 */}
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {formatNumber(stats.groups)}
              </div>
              <div className="text-gray-300 dark:text-gray-400 text-sm md:text-base">
                Active Groups
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {formatNumber(stats.members)}
              </div>
              <div className="text-gray-300 dark:text-gray-400 text-sm md:text-base">
                Members
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {formatNumber(stats.events)}
              </div>
              <div className="text-gray-300 dark:text-gray-400 text-sm md:text-base">
                Events
              </div>
            </div>

            {/* Stat 4 */}
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {formatNumber(stats.cities)}
              </div>
              <div className="text-gray-300 dark:text-gray-400 text-sm md:text-base">
                Cities
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex-1 relative z-10"
        >
          <div className="relative">
            {/* Image Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#27548A]/20 to-transparent rounded-3xl blur-2xl opacity-50"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <img
                src="https://i.ibb.co/tMSwFtDD/group-Event.webp"
                alt="Hero banner"
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Banner;
