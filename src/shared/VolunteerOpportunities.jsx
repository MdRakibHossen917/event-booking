import React from "react";

const VolunteerOpportunities = () => {
  const opportunities = [
    {
      id: 1,
      title: "Community Clean-Up Drive",
      date: "2025-07-20",
      location: "Central Park",
      description:
        "Join us to clean up the local park and surrounding areas. Help keep our community green and beautiful!",
    },
    {
      id: 2,
      title: "Food Bank Assistance",
      date: "2025-07-25",
      location: "City Food Bank",
      description:
        "Help organize and distribute food to families in need at the city food bank.",
    },
    {
      id: 3,
      title: "Animal Shelter Support",
      date: "2025-08-01",
      location: "Happy Paws Shelter",
      description:
        "Assist with caring for animals, cleaning, and organizing adoption events.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-[#27548A] mb-8">
        Volunteer Opportunities
      </h1>
      <p className="text-center text-gray-700 mb-12 max-w-xl mx-auto">
        Explore ways to give back to your community. Find volunteer
        opportunities that fit your interests and schedule.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map(({ id, title, date, location, description }) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-[#27548A] mb-2">
              {title}
            </h2>
            <p className="text-sm text-gray-500 mb-1">
              <strong>Date:</strong> {date}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <strong>Location:</strong> {location}
            </p>
            <p className="text-gray-700">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VolunteerOpportunities;
