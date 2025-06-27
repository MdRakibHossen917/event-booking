import React from "react";
import { FaUsers, FaEdit, FaCalendarCheck } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUsers size={28} className="text-blue-600" />,
      title: "Join the Platform",
      description:
        "Create an account to explore and connect with hobby groups that match your interests.",
    },
    {
      icon: <FaEdit size={28} className="text-blue-600" />,
      title: "Create or Join Groups",
      description:
        "Either create your own group or join existing ones to share your passion and ideas.",
    },
    {
      icon: <FaCalendarCheck size={28} className="text-blue-600" />,
      title: "Participate in Events",
      description:
        "Attend events, workshops, and meetups organized by the community members.",
    },
  ];

  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          HobbyHub makes it simple to connect with like-minded people. Whether
          you want to start a new group or find an existing one, the process is
          quick and easy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-left"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
