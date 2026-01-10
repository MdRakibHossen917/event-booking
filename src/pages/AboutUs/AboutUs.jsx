import React from "react";

const AboutUs = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white dark:bg-gray-900">
      <div className="w-11/12 mx-auto">
        <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-6">
          About Hobby Hub
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Hobby Hub is a community-driven platform designed to bring together
          individuals who share similar interests and passions. Whether you're
          into photography, painting, running, or cooking — our goal is to help
          you connect, collaborate, and grow through shared experiences.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-base">
          We believe that hobbies are more than just pastimes; they are a path
          to mental well-being, creativity, and real-world connections. HobbyHub
          allows users to create, discover, and join local hobby groups, attend
          events, and build meaningful friendships with like-minded individuals.
          Our platform is secure, easy to use, and built with your interests at
          heart.
        </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
