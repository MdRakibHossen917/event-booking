import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Button from "./Button";

const Banner = () => {
  return (
    <section className="-mt-15 bg-[#F5FAFF] dark:bg-gray-900 py-20 px-6">
      <div className="w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-[#27548A] dark:text-blue-400"
          >
            Discover Local Hobby Groups
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-lg"
          >
            <span className="text-gray-800 dark:text-gray-200 font-semibold">
              Join, create and participate
            </span>{" "}
            in events that match your interests. From painting to hiking, find
            your tribe today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center md:justify-start"
          >
            <Link to="/allGroups">
              <Button className="px-6 md:px-8 lg:px-12 py-3 md:py-4 text-base md:text-lg">
                Explore Groups
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex-1"
        >
          <img
            src="https://i.ibb.co/tMSwFtDD/group-Event.webp"
            alt="Hero banner"
            className="w-full h-auto rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
