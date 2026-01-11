import React from "react";
import logo from "../assets/log.png";
import { Link } from "react-router";
import { Twitter, Linkedin, Github, Mail, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#101828] dark:bg-[#101828] text-white py-12 md:py-16">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img className="h-12 w-auto" src={logo} alt="HobbyHub Logo" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Building communities, one hobby at a time. Connect with like-minded enthusiasts and discover amazing events in your area.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://github.com/MdRakibHossen917"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#27548A] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/md-rakib-hossen-5b1aa3274/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#27548A] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.facebook.com/md.rakib.hossen.41751"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#27548A] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:contact@hobbyhub.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#27548A] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h6 className="text-white font-semibold text-base mb-4">Services</h6>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/allGroups"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  to="/createGroup"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Create Event
                </Link>
              </li>
              <li>
                <Link
                  to="/articles"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/eventOrg"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Event Organisers
                </Link>
              </li>
              <li>
                <Link
                  to="/VolunteerOpp"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Volunteer Opportunities
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="text-white font-semibold text-base mb-4">Company</h6>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/aboutUs"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-white font-semibold text-base mb-4">Quick Links</h6>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/myGroup"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  My Events
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/home"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} HobbyHub. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Built with ❤️ by <span className="text-white font-semibold">Md Rakib Hossen</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
