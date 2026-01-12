import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  HandHeart, 
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Mail
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Button from "./Button";

const VolunteerOpportunities = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const opportunities = [
    {
      id: 1,
      title: "Community Clean-Up Drive",
      category: "Environment",
      date: "2025-02-15",
      time: "9:00 AM - 12:00 PM",
      location: "Central Park, Dhaka",
      description: "Join us to clean up the local park and surrounding areas. Help keep our community green and beautiful!",
      requirements: "No experience needed. Bring your enthusiasm!",
      volunteersNeeded: 20,
      icon: Heart,
    },
    {
      id: 2,
      title: "Food Bank Assistance",
      category: "Social Service",
      date: "2025-02-20",
      time: "10:00 AM - 2:00 PM",
      location: "City Food Bank, Gulshan",
      description: "Help organize and distribute food to families in need at the city food bank.",
      requirements: "Compassionate, organized, able to lift boxes (optional)",
      volunteersNeeded: 15,
      icon: HandHeart,
    },
    {
      id: 3,
      title: "Animal Shelter Support",
      category: "Animals",
      date: "2025-02-25",
      time: "8:00 AM - 4:00 PM",
      location: "Happy Paws Shelter, Banani",
      description: "Assist with caring for animals, cleaning, and organizing adoption events.",
      requirements: "Love for animals, patient demeanor",
      volunteersNeeded: 12,
      icon: Heart,
    },
    {
      id: 4,
      title: "Youth Mentorship Program",
      category: "Education",
      date: "2025-03-01",
      time: "3:00 PM - 5:00 PM",
      location: "Community Center, Dhanmondi",
      description: "Mentor and guide young students in their academic and personal development journey.",
      requirements: "Background in education or relevant field preferred",
      volunteersNeeded: 10,
      icon: Sparkles,
    },
    {
      id: 5,
      title: "Senior Care Companion",
      category: "Social Service",
      date: "2025-03-05",
      time: "2:00 PM - 4:00 PM",
      location: "Senior Living Home, Uttara",
      description: "Spend time with elderly residents, engage in activities, and provide companionship.",
      requirements: "Patient, empathetic, good communication skills",
      volunteersNeeded: 8,
      icon: Users,
    },
    {
      id: 6,
      title: "Digital Literacy Workshop",
      category: "Education",
      date: "2025-03-10",
      time: "11:00 AM - 1:00 PM",
      location: "Tech Hub, Motijheel",
      description: "Teach basic computer and internet skills to community members.",
      requirements: "Tech-savvy, good teaching abilities",
      volunteersNeeded: 5,
      icon: Sparkles,
    },
  ];

  const categories = ["All", "Environment", "Social Service", "Education", "Animals"];

  const filteredOpportunities = selectedCategory === "All" 
    ? opportunities 
    : opportunities.filter(opp => opp.category === selectedCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>HobbyHub | Volunteer Opportunities</title>
      </Helmet>

      {/* Banner Section */}
      <section className="relative bg-[#101828] dark:bg-gray-900 py-8 md:py-16 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#27548A]/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#27548A]/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-11/12 mx-auto max-w-7xl px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Text Section */}
            <div className="text-center lg:text-left space-y-6 z-10">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
              >
                Volunteer Opportunities
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Make a meaningful impact in your community. Join our volunteer programs and help create positive change while connecting with like-minded individuals.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="#opportunities"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#27548A] to-[#1e3d6b] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#27548A]/40"
                >
                  <span>Explore Opportunities</span>
                  <ArrowRight className="ml-2" size={20} />
                </a>
                <a
                  href="mailto:mdrakibhossencse@gmail.com"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg transition-all duration-200 hover:bg-white/10"
                >
                  <Mail className="mr-2" size={20} />
                  <span>Contact Us</span>
                </a>
              </motion.div>
            </div>

            {/* Right Image Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet !bg-white/50",
                    bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
                  }}
                  loop={true}
                  className="volunteer-banner-swiper"
                >
                  {[
                    "https://i.ibb.co/DgR9qkCZ/Volunteer1.jpg",
                    "https://i.ibb.co/Kcfk2h3t/Volunteer2.jpg",
                    "https://i.ibb.co/fGS8hvhT/Volunteer3.jpg",
                    "https://i.ibb.co/0yPZnLns/Volunteer4.jpg",
                  ].map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full aspect-[4/3] md:aspect-video">
                        <img
                          src={image}
                          alt={`Volunteer activity ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="w-11/12 mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-4">
              Why Volunteer with Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Volunteering offers countless benefits for both you and your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Heart,
                title: "Make a Difference",
                description: "Contribute to causes that matter and see the real impact of your efforts in your community."
              },
              {
                icon: Users,
                title: "Build Connections",
                description: "Meet new people, expand your network, and form lasting friendships with passionate volunteers."
              },
              {
                icon: Sparkles,
                title: "Grow Personally",
                description: "Develop new skills, gain valuable experience, and boost your confidence through meaningful work."
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#F5FAFF] to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#27548A] to-[#1e3d6b] flex items-center justify-center text-white">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section id="opportunities" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="w-11/12 mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-4">
              Current Opportunities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Browse available volunteer positions and find one that matches your interests
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-[#27548A] text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#27548A] dark:hover:border-blue-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27548A] to-[#1e3d6b] flex items-center justify-center text-white flex-shrink-0">
                      <opportunity.icon size={24} />
                    </div>
                    <span className="px-3 py-1 bg-[#27548A]/10 dark:bg-blue-500/20 text-[#27548A] dark:text-blue-400 text-xs font-semibold rounded-full">
                      {opportunity.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {opportunity.description}
                  </p>
                </div>

                {/* Details */}
                <div className="px-6 pb-4 space-y-2.5">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" />
                    <span>{formatDate(opportunity.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" />
                    <span>{opportunity.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" />
                    <span className="truncate">{opportunity.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 text-[#27548A] dark:text-blue-400 mr-2 flex-shrink-0" />
                    <span>{opportunity.volunteersNeeded} volunteers needed</span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="px-6 pb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <strong className="text-gray-700 dark:text-gray-300">Requirements:</strong> {opportunity.requirements}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="px-6 pb-6 mt-auto">
                  <a
                    href={`mailto:mdrakibhossencse@gmail.com?subject=Volunteer Application: ${opportunity.title}`}
                    className="w-full block text-center px-4 py-3 bg-gradient-to-r from-[#27548A] to-[#1e3d6b] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No opportunities found in this category. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="w-11/12 mx-auto max-w-7xl px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-4">
                How to Apply
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Getting started is easy. Follow these simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  step: "1",
                  title: "Browse Opportunities",
                  description: "Explore available volunteer positions and find one that matches your interests and schedule."
                },
                {
                  step: "2",
                  title: "Click Apply Now",
                  description: "Click the 'Apply Now' button on any opportunity that interests you to send us an email."
                },
                {
                  step: "3",
                  title: "Get Started",
                  description: "Our team will contact you with further details and help you get started with volunteering."
                }
              ].map((step, index) => (
                <div
                  key={step.step}
                  className="relative bg-gradient-to-br from-[#F5FAFF] to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#27548A] to-[#1e3d6b] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#101828] dark:bg-gray-900">
        <div className="w-11/12 mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Have Questions?
            </h2>
            <p className="text-lg md:text-xl text-blue-50 mb-8 max-w-2xl mx-auto leading-relaxed">
              We're here to help! Reach out to us if you have any questions about volunteering or want to suggest a new opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:mdrakibhossencse@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#27548A] font-semibold rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-xl"
              >
                <Mail size={20} />
                <span>Contact Us</span>
              </a>
              <Link to="/contact">
                <Button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default VolunteerOpportunities;
