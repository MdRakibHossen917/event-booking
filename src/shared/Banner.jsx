import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Fade } from "react-awesome-reveal";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Find Your Hobby Buddies!",
      subtitle: "Join local groups and enjoy your passion",
      image:
        "https://i.ibb.co/1tSCjSRT/Chat-GPT-Image-May-21-2025-07-12-37-AM.png",
      ctaLink: "/groups",
      ctaText: "Explore Groups",
    },
    {
      id: 2,
      title: "Explore Nature with Friends",
      subtitle: "Discover hiking groups near you",
      image:
        "https://i.ibb.co/xKhRFpc9/82557fdf-0604-41a6-99e6-ebda14da5565.jpg",
      ctaLink: "/groups",
      ctaText: "Explore Groups",
    },
    {
      id: 3,
      title: "Run for Fun",
      subtitle:
        "Join our running group to stay fit, motivated, and make new friends.",
      image: "https://i.ibb.co/wFrzvhs0/running-picture-1.png",
      ctaLink: "/groups",
      ctaText: "Explore Groups",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto my-5">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-lg overflow-hidden shadow-lg"
      >
        {slides.map(({ id, title, subtitle, image, ctaLink, ctaText }) => (
          <SwiperSlide key={id}>
            <div className="relative h-[400px] md:h-[500px] w-full">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover brightness-75"
              />
              <Fade direction="up" triggerOnce cascade damping={0.9}>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6 md:px-12">
                  <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                    {title}
                  </h1>
                  <p className="text-lg md:text-2xl mb-10 drop-shadow-md">
                    {subtitle}
                  </p>
                  <a
                    href={ctaLink}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-semibold shadow-lg transition"
                  >
                    {ctaText}
                  </a>
                </div>
              </Fade>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
