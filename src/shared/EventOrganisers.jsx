import React from "react";

const EventOrganisers = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 p-6">
      <div className="w-11/12 mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-6">
          Event Organisers
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl text-center mb-8">
          Welcome to the Event Organisers page. Here you can find all the
          information about upcoming events, organisers, and how to participate.
        </p>

        {/* Example list of organisers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-[#27548A] dark:text-blue-400">
            Creative Hobby Club
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Organises painting, sketching, and craft events around the city.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-[#27548A] dark:text-blue-400">
            Outdoor Adventure Group
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Specialises in hiking, trekking, and nature exploration events.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-[#27548A] dark:text-blue-400">
            Tech Innovators
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Hosts tech meetups, workshops, and hackathons for local developers.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default EventOrganisers;
