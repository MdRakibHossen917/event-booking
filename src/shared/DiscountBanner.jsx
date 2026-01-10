import React, { useEffect, useState } from "react";
import counterImage from "../assets/counter.jpg";

const DiscountBanner = () => {
  const [userCount, setUserCount] = useState(0);
  const [targetCount] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch total users count
    const fetchUserCount = () => {
      fetch("https://event-booking-server-wheat.vercel.app/totalUsers")
        .then((res) => res.json())
        .then((data) => {
          const count = data.total || 0;
          setUserCount(count);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user count:", err);
          setLoading(false);
        });
    };

    fetchUserCount();

    // Update every 5 seconds to show real-time counter
    const interval = setInterval(fetchUserCount, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animate counter number
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (userCount > 0) {
      const duration = 1000; // 1 second animation
      const steps = 60;
      const increment = userCount / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.floor(increment * step), userCount);
        setDisplayCount(current);

        if (step >= steps || current >= userCount) {
          setDisplayCount(userCount);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [userCount]);

  const remainingSpots = Math.max(0, targetCount - userCount);
  const percentage = Math.min(100, (userCount / targetCount) * 100);

  return (
    <section className="my-16">
      <div className="w-11/12 mx-auto px-4">
        <div className="relative bg-gradient-to-br from-[#27548A] via-[#497da4] to-[#1e3d6b] rounded-3xl shadow-2xl overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side - Counter Display */}
          <div className="p-8 md:p-10 lg:p-12 text-white flex flex-col justify-center relative z-10">
            {/* Badge */}
            <div className="inline-block mb-4">
              <span className="bg-yellow-400 text-[#27548A] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                Limited Offer
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Lifetime Membership{" "}
              <span className="text-yellow-300 block mt-2">FREE for First 100 Users!</span>
            </h2>
            
            <p className="text-base sm:text-lg text-blue-50 mb-8 leading-relaxed max-w-lg">
              Be among the first 100 users to join HobbyHub and enjoy lifetime access
              to all exclusive hobby groups and events – absolutely free!
            </p>

            {/* Counter Display Card */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 border-2 border-white/20 shadow-xl">
              <div className="text-center">
                <p className="text-sm uppercase tracking-wider text-blue-200 mb-4 font-semibold">
                  👥 Total Users Joined
                </p>
                
                {loading ? (
                  <div className="flex justify-center items-center h-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline justify-center gap-3 mb-6">
                      <div className="text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl tracking-tight">
                        {displayCount.toString().padStart(3, '0')}
                      </div>
                      <span className="text-3xl md:text-4xl font-bold text-blue-200">/ 100</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-white/25 rounded-full h-6 overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-yellow-300 to-yellow-400 h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-3 shadow-lg"
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-xs font-bold text-[#27548A]">
                            {Math.round(percentage)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <p className="text-xl md:text-2xl font-bold">
                        {remainingSpots > 0 ? (
                          <>
                            <span className="text-yellow-300 text-3xl">{remainingSpots}</span>{" "}
                            <span className="text-white">spots remaining!</span>
                          </>
                        ) : (
                          <span className="text-green-300 text-2xl">🎉 All spots filled!</span>
                        )}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Counter Image */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden lg:min-h-[600px] bg-white">
            <img
              src={counterImage}
              alt="Membership Counter"
              className="w-full h-full object-cover object-center lg:object-right-center"
              style={{ objectPosition: 'center center' }}
            />
            
            {/* Floating badge on image */}
            <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl z-20 hidden lg:block transform hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="text-3xl font-black text-[#27548A] dark:text-blue-400 mb-1">
                  {loading ? "..." : displayCount.toString().padStart(3, '0')}
                </div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Joined
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountBanner;
