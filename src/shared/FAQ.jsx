import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I join a hobby group?",
      answer: "Simply browse through our 'All Groups' section, find a group that interests you, and click the 'Join Now' button. You'll be automatically added to the group and can start participating in events and discussions."
    },
    {
      question: "Is HobbyHub free to use?",
      answer: "Yes! HobbyHub is completely free to use. You can create an account, join groups, attend events, and connect with like-minded people at no cost. We believe in building a community that's accessible to everyone."
    },
    {
      question: "Can I create my own hobby group?",
      answer: "Absolutely! If you have a passion you'd like to share, you can create your own group. Click on 'Create Group' in the navigation menu, fill in the details about your group, and start inviting members to join your community."
    },
    {
      question: "How do I find events near me?",
      answer: "You can filter events by location in the 'All Groups' section. Each group displays its location, and you can search for groups in your area. Once you join a group, you'll see all upcoming events organized by that group."
    },
    {
      question: "What types of hobbies are supported?",
      answer: "HobbyHub supports all types of hobbies! From photography, cooking, and book clubs to sports, arts and crafts, gaming, and more. If you have a passion, there's likely a group for it, or you can create one."
    },
    {
      question: "How do I contact event organizers?",
      answer: "Once you join a group, you can interact with organizers and other members through the group's page. You can view event details, ask questions, and connect with the community directly through the platform."
    },
    {
      question: "Can I leave a group if I'm no longer interested?",
      answer: "Yes, you can leave a group at any time. Simply go to your 'My Groups' section, find the group you want to leave, and click the leave option. You can always rejoin later if you change your mind."
    },
    {
      question: "Is my personal information safe?",
      answer: "Your privacy and security are our top priorities. We use industry-standard encryption and security measures to protect your data. You control what information is visible to other members, and we never share your data with third parties."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-white dark:from-gray-900 to-[#F5FAFF] dark:to-gray-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#27548A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#27548A] rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-11/12 mx-auto max-w-7xl px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
 
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#27548A] dark:text-blue-400 mb-2 md:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Got questions? We've got answers! Find everything you need to know about HobbyHub.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#27548A] focus:ring-offset-2 rounded-2xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:scale-[1.01]"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-white pr-8 flex-1">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-[#27548A] dark:text-blue-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Still have questions?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#27548A] to-[#1e3d6b] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

