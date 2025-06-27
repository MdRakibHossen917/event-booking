import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUsers, FaLayerGroup, FaUserPlus, FaUserEdit } from "react-icons/fa";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  const [chartData, setChartData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(true);

  // Stats for cards
  const [totalGroups, setTotalGroups] = useState(0);
  const [myGroupsCount, setMyGroupsCount] = useState(0);
  const [joinedGroupsCount, setJoinedGroupsCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    // Fetch chart data
    fetch("https://event-booking-server-l2liirj9x.vercel.app/dashboard-stats")
      .then((res) => res.json())
      .then((data) => {
        setChartData(data);
        setLoadingChart(false);
      })
      .catch((error) => {
        console.error("Error loading chart data:", error);
        setLoadingChart(false);
      });

    // Fetch stats for cards
    async function fetchStats() {
      try {
        const totalRes = await fetch(
          "https://event-booking-server-l2liirj9x.vercel.app/groups"
        );
        const totalData = await totalRes.json();
        setTotalGroups(totalData.length);

        if (user?.email) {
          const myGroupsRes = await fetch(
            `https://event-booking-server-l2liirj9x.vercel.app/groups?userEmail=${user.email}`
          );
          const myGroupsData = await myGroupsRes.json();
          setMyGroupsCount(myGroupsData.length);

          const joinedRes = await fetch(
            `https://event-booking-server-l2liirj9x.vercel.app/user-joined-groups?email=${user.email}`
          );
          const joinedData = await joinedRes.json();
          setJoinedGroupsCount(joinedData.length);
        }

        const userCountRes = await fetch(
          "https://event-booking-server-l2liirj9x.vercel.app/totalUsers"
        );
        const userCountData = await userCountRes.json();
        setTotalUsers(userCountData.total);

        setLoadingStats(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoadingStats(false);
      }
    }

    fetchStats();
  }, [user]);

  if (loadingChart || loadingStats) return <p>Loading dashboard...</p>;

  return (
    <div className="px-4 md:px-10 py-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Dashboard Overview
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Groups"
          count={totalGroups}
          bgColor="bg-blue-100"
          textColor="text-blue-800"
          icon={<FaLayerGroup className="text-4xl text-blue-600 mx-auto" />}
        />
        <StatCard
          title="My Created Groups"
          count={myGroupsCount}
          bgColor="bg-green-100"
          textColor="text-green-800"
          icon={<FaUserEdit className="text-4xl text-green-600 mx-auto" />}
        />
        <StatCard
          title="Joined Groups"
          count={joinedGroupsCount}
          bgColor="bg-yellow-100"
          textColor="text-yellow-800"
          icon={<FaUserPlus className="text-4xl text-yellow-600 mx-auto" />}
        />
        <StatCard
          title="Total Users"
          count={totalUsers}
          bgColor="bg-purple-100"
          textColor="text-purple-800"
          icon={<FaUsers className="text-4xl text-purple-600 mx-auto" />}
        />
      </div>

      {/* Chart Section */}
      <div className="w-full h-80 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Users & Groups Over Time</h2>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              fill="#8884d8"
              name="Users"
            />
            <Area
              type="monotone"
              dataKey="groups"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Groups"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Logged-in User Info Card */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Logged-in User Info
        </h2>

        <div className="border p-4 rounded bg-base-100 shadow-xl flex items-center gap-4">
          <img
            src={user?.photoURL || "https://via.placeholder.com/80"}
            alt={user?.displayName || "User"}
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <p className="text-lg font-semibold">
              <strong>Name:</strong> {user?.displayName || "No Name"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// StatCard Component
const StatCard = ({ title, count, bgColor, textColor, icon }) => (
  <div
    className={`rounded shadow p-6 text-center transition-transform hover:scale-105 duration-300 cursor-pointer ${bgColor} ${textColor}`}
  >
    <div className="mb-3">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-1">{count}</p>
  </div>
);

export default DashboardHome;
