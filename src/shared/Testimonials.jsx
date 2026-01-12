import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Artist & Group Organizer",
    comment:
      "HobbyHub has completely transformed the way I connect with like-minded people. Organizing art meetups has never been this easy!",
    image:
      "https://i.ibb.co/ZRG9YZNM/matheus-ferrero-W7b3e-DUb-2-I-unsplash.jpg",
    rating: 5,
  },
  {
    name: "Jara Hossain",
    role: "Photography Enthusiast",
    comment:
      "Thanks to HobbyHub, I joined multiple local photography events and made so many friends! It's a great community platform.",
    image: "https://i.ibb.co/wrZ4yYfK/singing.jpg",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Book Club Member",
    comment:
      "The experience of finding and joining book clubs through this platform is seamless and enjoyable. Highly recommended!",
    image:
      "https://i.ibb.co/rKHXMDCn/nathan-mullet-L922-Dy3-Iz-LA-unsplash.jpg",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Book Club Member",
    comment:
      "The experience of finding and joining book clubs through this platform is seamless and enjoyable. Highly recommended!",
    image:
      "https://i.ibb.co/rKHXMDCn/nathan-mullet-L922-Dy3-Iz-LA-unsplash.jpg",
    rating: 5,
  },
];

// Testimonial Card Component
const TestimonialCard = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 group relative overflow-hidden h-full">
      {/* Quote Icon Background */}
      <div className="absolute top-4 right-4 opacity-5">
        <FaQuoteLeft size={80} className="text-[#27548A] dark:text-blue-400" />
      </div>

      {/* Quote Icon */}
      <div className="mb-4 relative z-10">
        <div className="inline-block bg-[#27548A]/10 dark:bg-blue-500/20 rounded-full p-3">
          <FaQuoteLeft size={20} className="text-[#27548A] dark:text-blue-400" />
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4 relative z-10">
        {[...Array(item.rating)].map((_, i) => (
          <FaStar
            key={i}
            className="text-yellow-400 dark:text-yellow-500 fill-current"
            size={18}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6 relative z-10">
        "{item.comment}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#27548A]/20 dark:border-blue-500/30 group-hover:border-[#27548A] dark:group-hover:border-blue-500 transition-colors"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#27548A]/20 dark:from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#27548A] dark:group-hover:text-blue-400 transition-colors">
            {item.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{item.role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-12 md:py-24 px-4 bg-gradient-to-b from-white dark:from-gray-800 to-[#F5FAFF] dark:to-gray-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#27548A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-[#27548A] rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-11/12 mx-auto max-w-7xl">
        <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#27548A] dark:text-blue-400 mb-2 md:mb-4">
            What Our Members Say
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover what real users think about HobbyHub. Join thousands who found
            joy through shared hobbies and community events!
          </p>
        </div>

        {/* Testimonials - Mobile Carousel / Desktop Grid */}
        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="!pb-12"
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={idx}>
                <TestimonialCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6">
          {testimonials.map((item, idx) => (
            <TestimonialCard key={idx} item={item} />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
