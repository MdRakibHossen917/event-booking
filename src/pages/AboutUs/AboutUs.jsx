import React, { useEffect, useState, useRef } from "react";
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Shield, 
  Sparkles, 
  Zap,
  Twitter,
  Linkedin,
  Github,
  Mail
} from 'lucide-react';
import Button from '../../shared/Button';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative bg-[#101828] dark:bg-[#101828] py-20 md:py-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2327548A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="w-11/12 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Building Communities,
            <br />
            <span className="text-blue-400">One Hobby at a Time</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            HobbyHub is a community-driven platform designed to bring together individuals who share similar interests and passions. We believe in the power of connection, creativity, and collaboration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/contact">
              <Button className="px-8 py-4 text-lg">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Our Story Section Component
const OurStorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 px-4 md:px-6">
      <div className="w-11/12 mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p className="text-base md:text-lg">
                  HobbyHub was born from a simple idea: everyone deserves to find their tribe. Whether you're into photography, painting, running, or cooking, we wanted to create a space where passion meets community.
                </p>
                <p className="text-base md:text-lg">
                  We believe that hobbies are more than just pastimes; they are a path to mental well-being, creativity, and real-world connections. Our platform allows users to create, discover, and join local hobby groups, attend events, and build meaningful friendships with like-minded individuals.
                </p>
                <p className="text-base md:text-lg">
                  Our mission is to make it easier than ever to connect with others who share your interests, learn new skills, and grow together as a community.
                </p>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                  alt="Our team working together"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#27548A] dark:bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Value Card Component
const ValueCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-[#27548A] to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-white" size={32} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

// Mission, Vision & Values Section
const MissionVisionValuesSection = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To create a vibrant, inclusive platform where hobby enthusiasts can connect, learn, and grow together. We're committed to fostering meaningful relationships and supporting personal growth through shared interests."
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To become the leading global community platform where every individual can discover their passion, find their tribe, and build lasting connections that enrich their lives and bring joy to everyday experiences."
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "We believe in authenticity, inclusivity, respect, and the power of community. Every feature we build and every decision we make is driven by our commitment to creating a safe, welcoming space for all hobby enthusiasts."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50 px-4 md:px-6">
      <div className="w-11/12 mx-auto">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mission, Vision & Values
            </h2>
            <div className="w-24 h-1 bg-[#27548A] dark:bg-blue-400 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Users,
      title: "Active Community",
      description: "Join thousands of passionate hobbyists actively participating in events and groups"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your privacy and security are our top priorities. We ensure a safe environment for all users"
    },
    {
      icon: Sparkles,
      title: "Diverse Interests",
      description: "From photography to cooking, find groups for every hobby imaginable"
    },
    {
      icon: Zap,
      title: "Easy to Use",
      description: "Intuitive interface designed to help you discover and join groups effortlessly"
    },
    {
      icon: Award,
      title: "Quality Events",
      description: "Curated events and activities organized by passionate community members"
    },
    {
      icon: Heart,
      title: "Supportive Environment",
      description: "A welcoming community where everyone can learn, share, and grow together"
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 px-4 md:px-6">
      <div className="w-11/12 mx-auto">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose HobbyHub?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover what makes us the perfect platform for hobby enthusiasts
            </p>
            <div className="w-24 h-1 bg-[#27548A] dark:bg-blue-400 mx-auto mt-4"></div>
          </motion.div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-[#27548A]/30 dark:hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#27548A] dark:bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-white" size={24} />
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
      </div>
    </section>
  );
};

// Team Card Component
const TeamCard = ({ name, role, bio, image, socialLinks, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-2 md:p-4 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group text-center  "
    >
      <div className="relative mb-6 inline-block ">
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700 group-hover:border-[#27548A] dark:group-hover:border-blue-500 transition-colors duration-300 "
        />
        <div className="absolute inset-0 rounded-full bg-[#27548A] dark:bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {name}
      </h3>
      <p className="text-[#27548A] dark:text-blue-400 font-medium mb-4">
        {role}
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
        {bio}
      </p>
      <div className="flex justify-center gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#27548A] dark:hover:bg-blue-500 hover:text-white transition-all duration-300 group-hover:scale-110"
          >
            <link.icon size={18} />
          </a>
        ))}
      </div>
    </motion.div>
  );
};

// Our Team Section
const OurTeamSection = () => {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Passionate about building communities that bring people together through shared interests.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      socialLinks: [
        { platform: "twitter", icon: Twitter, url: "#" },
        { platform: "linkedin", icon: Linkedin, url: "#" },
        { platform: "email", icon: Mail, url: "mailto:mdrakibhossencse@gmail.com" }
      ]
    },
    {
      name: "Sarah Chen",
      role: "Head of Community",
      bio: "Dedicated to creating inclusive spaces where everyone feels welcome and valued.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
      socialLinks: [
        { platform: "twitter", icon: Twitter, url: "#" },
        { platform: "linkedin", icon: Linkedin, url: "#" },
        { platform: "github", icon: Github, url: "#" }
      ]
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Developer",
      bio: "Building the technology that powers our platform with passion and precision.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      socialLinks: [
        { platform: "linkedin", icon: Linkedin, url: "#" },
        { platform: "github", icon: Github, url: "#" },
        { platform: "email", icon: Mail, url: "mailto:mdrakibhossencse@gmail.com" }
      ]
    },
    {
      name: "Emily Davis",
      role: "Community Manager",
      bio: "Connecting hobby enthusiasts and ensuring every event is a memorable experience.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      socialLinks: [
        { platform: "twitter", icon: Twitter, url: "#" },
        { platform: "linkedin", icon: Linkedin, url: "#" },
        { platform: "email", icon: Mail, url: "mailto:mdrakibhossencse@gmail.com" }
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50 px-4 md:px-6">
      <div className="w-11/12 mx-auto">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet the passionate people behind HobbyHub
            </p>
            <div className="w-24 h-1 bg-[#27548A] dark:bg-blue-400 mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member, index) => (
              <TeamCard
                key={member.name}
                {...member}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, label, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.floor(increment * step), value);
        setCount(current);

        if (step >= steps || current >= value) {
          setCount(value);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#27548A] dark:text-blue-400 mb-2">
        {count}{suffix}
      </div>
      <div className="text-lg text-gray-600 dark:text-gray-300 font-medium">
        {label}
      </div>
    </motion.div>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { value: 5, suffix: "+", label: "Years of Experience" },
    { value: 10000, suffix: "+", label: "Active Users" },
    { value: 500, suffix: "+", label: "Hobby Groups" },
    { value: 95, suffix: "%", label: "Satisfaction Rate" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#1E3D6B] to-[#1E3D6B]   ">
      <div className="w-11/12 mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    { icon: Twitter, url: "#", label: "Twitter" },
    { icon: Linkedin, url: "#", label: "LinkedIn" },
    { icon: Github, url: "#", label: "GitHub" },
    { icon: Mail, url: "mailto:mdrakibhossencse@gmail.com", label: "Email" }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="w-11/12 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-[#27548A] to-blue-600 dark:from-blue-900 dark:to-blue-800 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg md:text-xl text-blue-50 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start connecting with like-minded hobby enthusiasts today. Create your account and discover amazing groups and events in your area.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link to="/auth/register">
              <Button className="px-8 py-4 text-lg bg-white text-[#27548A] hover:bg-gray-100 border-2 border-white">
                Get Started
              </Button>
            </Link>
            <div className="flex gap-4 justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-[#27548A] transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main About Us Component
const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>HobbyHub | About Us</title>
      </Helmet>
      <div className="bg-white dark:bg-gray-900">
        <HeroSection />
        <OurStorySection />
        <MissionVisionValuesSection />
        <WhyChooseUsSection />
        <OurTeamSection />
        <StatsSection />
      </div>
    </>
  );
};

export default AboutUs;
