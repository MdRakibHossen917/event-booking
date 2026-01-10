// src/pages/Blog.jsx

import React from "react";

const blogs = [
  {
    id: 1,
    title: "Why Join a Hobby Group?",
    date: "July 2, 2025",
    image: "https://i.ibb.co/LDtwk9qk/istock-849845386.jpg",
    content:
      "Discover the benefits of connecting with people who share your passion. From learning new skills to making lifelong friends, joining a hobby group can transform your free time into something meaningful.",
  },
  {
    id: 2,
    title: "Top 5 Popular Hobbies in 2025",
    date: "June 20, 2025",
    image: "https://i.ibb.co/wFZpp5Jt/pexels-photo-7951621.jpg",
    content:
      "Wondering what's trending in 2025? From digital art to book clubs, here are the top hobbies people are diving into this year!",
  },
  {
    id: 3,
    title: "How to Start Your Own Hobby Group",
    date: "June 10, 2025",
    image: "https://i.ibb.co/L4Rn216/fishing.jpg",
    content:
      "Have a passion you want to share? Learn how to start and grow your own hobby group, step-by-step.",
  },
];

const BlogPage = () => {
  return (
    <section className="min-h-screen bg-[#f4f7fb] dark:bg-gray-900 py-10 px-4 md:px-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#27548A] dark:text-blue-400 mb-8">
          Hobby Hub Blog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{blog.date}</p>
              <p className="text-gray-700 mb-4">
                {blog.content.length > 120
                  ? blog.content.slice(0, 120) + "..."
                  : blog.content}
              </p>
              
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
