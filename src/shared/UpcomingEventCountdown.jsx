import React, { useEffect, useState } from "react";

const UpcomingEventCountdown = () => {
  // Set event date to 20 days from now at 10:00 AM
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 20);
  eventDate.setHours(10, 0, 0, 0); // 10:00:00 AM

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
  }, [eventDate]);

  return (
    <div className="bg-[#a2cff1] rounded-2xl w-10/12 mx-auto py-6 px-6 text-center mt-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-4 animate-pulse">
        ⏰ Big Event is Coming!
      </h2>

      <p className="text-gray-700 text-lg mb-2">
        📅 Event Date: {eventDate.toDateString()} at 10:00 AM
      </p>

      <p className="text-gray-700 text-base mb-6 max-w-xl mx-auto">
        Don't miss out! Join our exclusive event and be part of something
        exciting!
      </p>

      {timeLeft.days !== undefined ? (
        <div className="flex justify-center flex-wrap gap-6 text-center">
          {["Days", "Hours", "Minutes", "Seconds"].map((unit, i) => {
            const value = [
              timeLeft.days,
              timeLeft.hours,
              timeLeft.minutes,
              timeLeft.seconds,
            ][i];
            return (
              <div
                key={unit}
                className="flex flex-col items-center min-w-[70px]"
              >
                <span className="text-4xl font-bold text-blue-800">
                  {value}
                </span>
                <span className="text-gray-800">{unit}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xl text-red-800 font-semibold mt-4">
          🚀 The Event Has Started!
        </p>
      )}
    </div>
  );
};

export default UpcomingEventCountdown;
