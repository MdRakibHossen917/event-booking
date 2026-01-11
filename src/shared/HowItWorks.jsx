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
    <section className="py-12 md:py-24 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#27548A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#27548A] rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-11/12 mx-auto max-w-7xl">
        <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#27548A] dark:text-blue-400 mb-4 md:mb-6">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            HobbyHub makes it simple to connect with like-minded people. Whether
            you want to start a new group or find an existing one, the process is
            quick and easy.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-[#27548A]/30 dark:hover:border-blue-500/30 group overflow-hidden"
            >
              {/* Card Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#27548A]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Step Number */}
              <div className="relative z-10 flex justify-center mb-6 md:mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#27548A]/10 dark:bg-blue-500/10 rounded-full blur-2xl group-hover:bg-[#27548A]/20 dark:group-hover:bg-blue-500/20 transition-all duration-500 scale-150"></div>
                  <div className="relative bg-gradient-to-br from-[#27548A] to-[#1e3d6b] rounded-2xl p-6 text-white shadow-xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    {step.icon}
                  </div>
                </div>
              </div>

              {/* Step Number Badge */}
              <div className="relative z-10 flex justify-center mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-[#F5FAFF] to-white dark:from-gray-700 dark:to-gray-800 text-[#27548A] dark:text-blue-400 px-5 py-2 rounded-full text-sm font-bold shadow-md border border-[#27548A]/10 dark:border-blue-500/20">
                  Step {index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4 group-hover:text-[#27548A] dark:group-hover:text-blue-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
