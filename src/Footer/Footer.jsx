import React from "react";
import logo from "../assets/log.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#27548A] dark:bg-gray-800 text-white dark:text-gray-100 p-10">
      <div className="w-11/12 mx-auto">
        <div className="footer sm:footer-horizontal">
          {/* Logo + Name */}
          <aside>
        <img className="w-40 mb-3" src={logo} alt="GoJoy Logo" />
        <p className="font-semibold text-white dark:text-gray-100">Md Rakib Hossen</p>
      </aside>

      {/* Services */}
      <nav>
        <h6 className="footer-title text-white dark:text-gray-100 mb-2">Services</h6>
        <Link
          to="/eventOrg"
          className="link link-hover text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100"
        >
          Event Organisers
        </Link>
        <Link
          to="/VolunteerOpp"
          className="link link-hover text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100"
        >
          Volunteer Opportunities
        </Link>
      </nav>

      {/* Company */}
      <nav>
        <h6 className="footer-title text-white dark:text-gray-100 mb-2">Company</h6>
        <Link
          to={"/aboutUs"}
          className="link link-hover text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100"
        >
          About us
        </Link>
        <Link
          to={"/contact"}
          className="link link-hover text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100"
        >
          Contact
        </Link>
      </nav>

      {/* Social Connect */}
      <nav>
        <h6 className="footer-title text-white dark:text-gray-100 mb-2">Social Connect</h6>
        <div className="flex gap-5 text-gray-300 dark:text-gray-400">
          <a
            href="https://github.com/MdRakibHossen917"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="GitHub"
          >
            {/* GitHub Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61C4.422 17.07 3.633 16.7 3.633 16.7c-1.087-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.603-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3.003-.403c1.02.005 2.045.137 3.003.403 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.803 5.624-5.475 5.921.43.371.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.289 0 .319.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.628-5.373-12-12-12z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/md-rakib-hossen-5b1aa3274/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="LinkedIn"
          >
            {/* LinkedIn Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-11 19H5V9h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75S5.534 4.232 6.5 4.232s1.75.784 1.75 1.75-.784 1.75-1.75 1.75zM20 19h-3v-5.604c0-1.337-.025-3.06-1.865-3.06-1.867 0-2.153 1.459-2.153 2.965V19h-3V9h2.885v1.367h.041c.402-.762 1.384-1.565 2.847-1.565C19.067 8.802 20 10.194 20 12.807V19z" />
            </svg>
          </a>

          <a
            href="https://www.facebook.com/md.rakib.hossen.41751"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="Facebook"
          >
            {/* Facebook Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
