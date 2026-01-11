import React from "react";
import { FaUserPlus, FaUsers, FaCalendarCheck } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus size={40} />,
      title: "Join the Platform",
      description:
        "Create an account to explore and connect with hobby groups that match your interests.",
    },
    {
      icon: <FaUsers size={40} />,
      title: "Create or Join Groups",
      description:
        "Either create your own group or join existing ones to share your passion and ideas.",
    },
    {
      icon: <FaCalendarCheck size={40} />,
      title: "Participate in Events",
      description:
        "Attend events, workshops, and meetups organized by the community members.",
    },
  ];

  return (
    <section className="py-8 md:py-16 px-4 bg-gradient-to-b from-[#F5FAFF] dark:from-gray-900 to-white dark:to-gray-800">
      <div className="w-11/12 mx-auto">
        <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#27548A] dark:text-blue-400 mb-2 md:mb-6">
          How It Works
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-12 max-w-2xl mx-auto leading-relaxed">
          HobbyHub makes it simple to connect with like-minded people. Whether
          you want to start a new group or find an existing one, the process is
          quick and easy.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700 hover:border-[#27548A]/30 dark:hover:border-blue-500/30 group"
            >
              {/* Step Number */}
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#27548A]/10 rounded-full blur-xl group-hover:bg-[#27548A]/20 transition-colors"></div>
                  <div className="relative bg-gradient-to-br from-[#27548A] to-[#1e3d6b] rounded-2xl p-5 text-white shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
              </div>

              {/* Step Number Badge */}
              <div className="flex justify-center mb-2 md:mb-4">
                <span className="bg-[#F5FAFF] dark:bg-gray-700 text-[#27548A] dark:text-blue-400 px-4 py-1 rounded-full text-sm font-bold">
                  Step {index + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 md:mb-4 group-hover:text-[#27548A] dark:group-hover:text-blue-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed ">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
