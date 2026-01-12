import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  Star,
  Mail,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Heart
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Button from "./Button";

const EventOrganisers = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const organisers = [
    {
      id: 1,
      name: "Creative Hobby Club",
      category: "Arts & Crafts",
      description: "Organises painting, sketching, and craft events around the city. Join our vibrant community of artists and creators!",
      eventsCount: 24,
      membersCount: 450,
      rating: 4.8,
      location: "Dhaka, Bangladesh",
      specialties: ["Painting", "Sketching", "Crafts", "Workshops"],
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      icon: Sparkles,
    },
    {
      id: 2,
      name: "Outdoor Adventure Group",
      category: "Sports & Recreation",
      description: "Specialises in hiking, trekking, and nature exploration events. Discover the beauty of nature with like-minded adventurers.",
      eventsCount: 18,
      membersCount: 320,
      rating: 4.9,
      location: "Sylhet, Bangladesh",
      specialties: ["Hiking", "Trekking", "Camping", "Nature Tours"],
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=300&fit=crop",
      icon: TrendingUp,
    },
    {
      id: 3,
      name: "Tech Innovators",
      category: "Technology",
      description: "Hosts tech meetups, workshops, and hackathons for local developers. Stay ahead with the latest in technology!",
      eventsCount: 32,
      membersCount: 680,
      rating: 4.7,
      location: "Dhaka, Bangladesh",
      specialties: ["Meetups", "Workshops", "Hackathons", "Networking"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      icon: Sparkles,
    },
    {
      id: 4,
      name: "Book Lovers Circle",
      category: "Literature",
      description: "A community for book enthusiasts to discuss, share, and explore literature together through regular reading sessions.",
      eventsCount: 15,
      membersCount: 280,
      rating: 4.6,
      location: "Chittagong, Bangladesh",
      specialties: ["Book Clubs", "Reading Sessions", "Author Talks", "Literary Events"],
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      icon: Heart,
    },
    {
      id: 5,
      name: "Fitness Enthusiasts",
      category: "Health & Fitness",
      description: "Promotes healthy living through group workouts, yoga sessions, and fitness challenges. Your journey to wellness starts here!",
      eventsCount: 28,
      membersCount: 520,
      rating: 4.8,
      location: "Dhaka, Bangladesh",
      specialties: ["Yoga", "Group Workouts", "Fitness Challenges", "Wellness"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      icon: TrendingUp,
    },
    {
      id: 6,
      name: "Music & Performance Arts",
      category: "Entertainment",
      description: "Brings together musicians, performers, and music lovers for jam sessions, concerts, and performance showcases.",
      eventsCount: 22,
      membersCount: 410,
      rating: 4.9,
      location: "Dhaka, Bangladesh",
      specialties: ["Jam Sessions", "Concerts", "Open Mic", "Music Workshops"],
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      icon: Sparkles,
    },
  ];

  const categories = ["All", "Arts & Crafts", "Sports & Recreation", "Technology", "Literature", "Health & Fitness", "Entertainment"];

  const filteredOrganisers = selectedCategory === "All" 
    ? organisers 
    : organisers.filter(org => org.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>HobbyHub | Event Organisers</title>
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
                Event Organisers
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Discover talented organisers who create amazing events and bring communities together. Connect with passionate leaders in your area.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="#organisers"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#27548A] to-[#1e3d6b] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#27548A]/40"
                >
                  <span>Explore Organisers</span>
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/createGroup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg transition-all duration-200 hover:bg-white/10"
                >
                  <Mail className="mr-2" size={20} />
                  <span>Become an Organiser</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
                  alt="Event Organisers"
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Organisers Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="w-11/12 mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-4">
              Why Choose Our Organisers?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our organisers are passionate community leaders dedicated to creating memorable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Award,
                title: "Verified Organisers",
                description: "All organisers are verified and have a proven track record of successful events."
              },
              {
                icon: Users,
                title: "Active Communities",
                description: "Join vibrant communities with active members and regular engaging events."
              },
              {
                icon: Star,
                title: "Quality Events",
                description: "High-quality events with excellent organization and positive participant feedback."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#F5FAFF] to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#27548A] to-[#1e3d6b] flex items-center justify-center text-white">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organisers Section */}
      <section id="organisers" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="w-11/12 mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-4">
              Featured Organisers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Browse our community of talented event organisers and find the perfect match for your interests
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

          {/* Organisers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredOrganisers.map((organiser, index) => (
              <motion.div
                key={organiser.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={organiser.image}
                    alt={organiser.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#27548A]/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span>{organiser.rating}</span>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#27548A]/10 backdrop-blur-sm text-[#27548A] dark:text-blue-400 text-xs font-semibold rounded-full">
                    {organiser.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {organiser.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <MapPin className="w-4 h-4 text-[#27548A] dark:text-blue-400 mr-1" />
                        <span>{organiser.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                    {organiser.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 text-[#27548A] dark:text-blue-400 mr-1" />
                      <span>{organiser.eventsCount} Events</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4 text-[#27548A] dark:text-blue-400 mr-1" />
                      <span>{organiser.membersCount} Members</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {organiser.specialties.slice(0, 3).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#27548A]/10 dark:bg-blue-500/20 text-[#27548A] dark:text-blue-400 text-xs font-medium rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="/allGroups"
                    className="w-full text-center px-4 py-3 bg-gradient-to-r from-[#27548A] to-[#1e3d6b] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2 mt-auto"
                  >
                    <span>View Events</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOrganisers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No organisers found in this category. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Become an Organiser Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="w-11/12 mx-auto max-w-7xl px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#27548A] dark:text-blue-400 mb-4">
                Become an Event Organiser
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Ready to create amazing events and build your own community?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  step: "1",
                  title: "Create Your Profile",
                  description: "Sign up and create your organiser profile to showcase your expertise and interests."
                },
                {
                  step: "2",
                  title: "Organise Events",
                  description: "Create and publish events to attract like-minded participants and build your community."
                },
                {
                  step: "3",
                  title: "Grow Your Community",
                  description: "Engage with participants, gather feedback, and watch your community flourish."
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
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our community of event organisers and start creating memorable experiences for your community today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/createGroup">
                <Button className="px-8 py-4 text-lg">
                  Create Your First Event
                </Button>
              </Link>
              <a
                href="mailto:mdrakibhossencse@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg transition-all duration-200 hover:bg-white/10"
              >
                <Mail size={20} />
                <span>Contact Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default EventOrganisers;
