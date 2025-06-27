import React from "react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Artist & Group Organizer",
    comment:
      "Circle has completely transformed the way I connect with like-minded people. Organizing art meetups has never been this easy!",
    image:
      "https://i.ibb.co/ZRG9YZNM/matheus-ferrero-W7b3e-DUb-2-I-unsplash.jpg",
  },
  {
    name: "Jara Hossain",
    role: "Photography Enthusiast",
    comment:
      "Thanks to Circle, I joined multiple local photography events and made so many friends! It's a great community platform.",
    image: "https://i.ibb.co/wrZ4yYfK/singing.jpg",
  },
  {
    name: "Nusrat Jahan",
    role: "Book Club Member",
    comment:
      "The experience of finding and joining book clubs through this platform is seamless and enjoyable. Highly recommended!",
    image:
      "https://i.ibb.co/rKHXMDCn/nathan-mullet-L922-Dy3-Iz-LA-unsplash.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4  text-gray-800">
          What Our Members Say
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
          Discover what real users think about Circle. Join thousands who
          found joy through shared hobbies and community events!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center  mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover  mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{item.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
