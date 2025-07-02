import React from "react";
import { Link } from "react-router";
import Button from "./Button";

const DiscountBanner = () => {
  return (
    <div className="bg-[#497da4] text-white text-center py-8 px-6 rounded-lg shadow-lg max-w-5xl mx-auto my-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Lifetime Membership FREE for First 100 Users!
      </h2>
      <p className="text-sm md:text-base mb-4">
        Be among the first 100 users to join HobbyHub and enjoy lifetime access
        to all exclusive hobby groups and events – absolutely free!
      </p>
      <Button>
        <Link
          to="/come"
          className="inline-block text-white font-semibold px-6 py-2 rounded-full transition"
        >
          Claim Your Spot Now
        </Link>
      </Button>
    </div>
  );
};

export default DiscountBanner;
