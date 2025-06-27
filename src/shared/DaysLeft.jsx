import React, { useEffect, useState } from "react";

const DaysLeft = ({ eventDate }) => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const now = new Date();
      const event = new Date(eventDate);

      
      const diffTime = event.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);

     
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setDaysLeft(diffDays);
    };

    calculateDaysLeft();

    const interval = setInterval(calculateDaysLeft, 3600000);  

    return () => clearInterval(interval);
  }, [eventDate]);

  // Show text conditionally
  if (daysLeft > 0) {
    return (
      <span>
        {daysLeft}
        {" "}
        day(s) left
      </span>
    );
  } else if (daysLeft === 0) {
    return (
      <span>
        Offer
        
      </span>
    );
  } else {
    return (
      <span>
        Event
        <br />
        Passed
      </span>
    );
  }
};

export default DaysLeft;
