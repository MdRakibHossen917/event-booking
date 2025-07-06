import React from "react";
import { Link } from "react-router";
import Button from "./Button";

const DiscountBanner = () => {
  return (
    <div className="bg-[#497da4] text-white text-center py-8 px-4 sm:px-6 md:px-10 rounded-lg shadow-lg max-w-3xl lg:max-w-5xl mx-auto my-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
        Lifetime Membership FREE for First 100 Users!
      </h2>
      <p className="text-xs sm:text-sm md:text-base mb-6 max-w-xl mx-auto">
        Be among the first 100 users to join HobbyHub and enjoy lifetime access
        to all exclusive hobby groups and events – absolutely free!
      </p>
      <Button>
        <Link
          to="/come"
          className="inline-block text-white font-semibold px-5 py-2 sm:px-6 sm:py-2.5 rounded-full transition hover:bg-white hover:text-[#497da4]"
        >
          Claim Your Spot Now
        </Link>
      </Button>
    </div>
  );
};

export default DiscountBanner;
