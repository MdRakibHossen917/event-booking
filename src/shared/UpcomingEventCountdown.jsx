import React, { useEffect, useState } from "react";

const UpcomingEventCountdown = () => {
  const eventDate = new Date("2025-07-15T10:00:00");  
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = eventDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({});
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-50 py-12 px-6 text-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-4 animate-pulse">
        ⏰ Big Event is Coming!
      </h2>
      <p className="text-gray-600 text-lg mb-6">
        Don't miss out! Join our exclusive event and be part of something
        exciting!
      </p>

      {timeLeft.days !== undefined ? (
        <div className="flex justify-center gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-600">
              {timeLeft.days}
            </span>
            <span className="text-gray-500">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-600">
              {timeLeft.hours}
            </span>
            <span className="text-gray-500">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-600">
              {timeLeft.minutes}
            </span>
            <span className="text-gray-500">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-600">
              {timeLeft.seconds}
            </span>
            <span className="text-gray-500">Seconds</span>
          </div>
        </div>
      ) : (
        <p className="text-xl text-red-500 font-semibold mt-4">
          Event has started!
        </p>
      )}
    </div>
  );
};

export default UpcomingEventCountdown;
