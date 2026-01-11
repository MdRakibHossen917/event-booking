import React, { useEffect, useState, useContext } from "react";
import { Helmet } from 'react-helmet-async';
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
    fetch(" https://event-booking-server-wheat.vercel.app/dashboard-stats")
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
          " https://event-booking-server-wheat.vercel.app/groups"
        );
        const totalData = await totalRes.json();
        setTotalGroups(totalData.length);

        if (user?.email) {
          const myGroupsRes = await fetch(
            ` https://event-booking-server-wheat.vercel.app/groups?userEmail=${user.email}`
          );
          const myGroupsData = await myGroupsRes.json();
          setMyGroupsCount(myGroupsData.length);

          const joinedRes = await fetch(
            ` https://event-booking-server-wheat.vercel.app/user-joined-groups?email=${user.email}`
          );
          const joinedData = await joinedRes.json();
          setJoinedGroupsCount(joinedData.length);
        }

        const userCountRes = await fetch(
          " https://event-booking-server-wheat.vercel.app/totalUsers"
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

  if (loadingChart || loadingStats)
    return (
      <>
        <Helmet>
          <title>HobbyHub | My Hub</title>
        </Helmet>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#27548A] border-t-transparent dark:border-blue-400 dark:border-t-transparent mb-4"></div>
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              Loading dashboard...
            </p>
          </div>
        </div>
      </>
    );
  

  return (
    <>
      <Helmet>
        <title>HobbyHub | My Hub</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2327548A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          {/* Content */}
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-[#27548A] text-white rounded-full text-sm font-semibold mb-4">
                  Dashboard Overview
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                  Welcome back!
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Here's what's happening with your events.
                </p>
              </div>
              
              {/* Decorative Element */}
              <div className="hidden md:flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-[#27548A] rounded-full opacity-10 dark:opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#27548A] rounded-full opacity-20 dark:opacity-30"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#27548A] rounded-full opacity-30 dark:opacity-40"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Total Groups"
            count={totalGroups}
            gradient="from-blue-500 to-blue-600"
            iconColor="text-blue-500"
            icon={<FaLayerGroup className="text-3xl" />}
          />
          <StatCard
            title="My Created Groups"
            count={myGroupsCount}
            gradient="from-green-500 to-green-600"
            iconColor="text-green-500"
            icon={<FaUserEdit className="text-3xl" />}
          />
          <StatCard
            title="Joined Groups"
            count={joinedGroupsCount}
            gradient="from-yellow-500 to-orange-500"
            iconColor="text-yellow-500"
            icon={<FaUserPlus className="text-3xl" />}
          />
          <StatCard
            title="Total Users"
            count={totalUsers}
            gradient="from-purple-500 to-purple-600"
            iconColor="text-purple-500"
            icon={<FaUsers className="text-3xl" />}
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Analytics Overview
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Users & Groups Over Time
              </p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorGroups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  name="Users"
                />
                <Area
                  type="monotone"
                  dataKey="groups"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorGroups)"
                  name="Groups"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Profile
          </h2>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user?.photoURL || "https://via.placeholder.com/100"}
                alt={user?.displayName || "User"}
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {user?.displayName || "No Name"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 break-all">
                {user?.email}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#27548A] text-white rounded-lg text-sm font-medium">
                  Active User
                </span>
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">
                  {myGroupsCount} Created Events
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium">
                  {joinedGroupsCount} Joined Events
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// StatCard Component
const StatCard = ({ title, count, gradient, iconColor, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white">{icon}</div>
      </div>
      <div className={`${iconColor} opacity-20 group-hover:opacity-30 transition-opacity`}>
        {icon}
      </div>
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {title}
      </p>
      <p className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {count}
      </p>
    </div>
  </div>
);

export default DashboardHome;
