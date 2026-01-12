import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, UserCheck, Database, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Welcome to HobbyHub ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            By accessing or using HobbyHub, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
          </p>
        </div>
      ),
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: Database,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Personal Information</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Profile information (profile picture, bio, interests)</li>
              <li>Account credentials (username, password)</li>
              <li>Payment information (processed securely through third-party payment processors)</li>
              <li>Content you create (events, groups, articles, comments)</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Automatically Collected Information</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              When you use our services, we automatically collect certain information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, links clicked)</li>
              <li>Location data (if you enable location services)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use the information we collect for various purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>To provide, maintain, and improve our services</li>
            <li>To create and manage your account</li>
            <li>To process transactions and send related information</li>
            <li>To send you notifications, updates, and promotional communications</li>
            <li>To personalize your experience and provide relevant content</li>
            <li>To detect, prevent, and address technical issues and security threats</li>
            <li>To comply with legal obligations and enforce our terms</li>
            <li>To analyze usage patterns and improve our platform</li>
          </ul>
        </div>
      ),
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: Globe,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We do not sell your personal information. We may share your information in the following circumstances:
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Public Information</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Information you choose to make public (profile information, events, posts) is visible to other users and may be indexed by search engines.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Service Providers</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may share information with third-party service providers who perform services on our behalf (hosting, payment processing, analytics).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Legal Requirements</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may disclose information if required by law or in response to valid requests by public authorities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Business Transfers</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication measures</li>
            <li>Secure payment processing through certified providers</li>
            <li>Regular backups and disaster recovery procedures</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </div>
      ),
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      icon: UserCheck,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You have certain rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li><strong>Access:</strong> You can access and review your personal information through your account settings</li>
            <li><strong>Correction:</strong> You can update or correct your information at any time</li>
            <li><strong>Deletion:</strong> You can request deletion of your account and associated data</li>
            <li><strong>Opt-out:</strong> You can opt out of marketing communications by adjusting your preferences</li>
            <li><strong>Data Portability:</strong> You can request a copy of your data in a portable format</li>
            <li><strong>Objection:</strong> You can object to certain processing activities where applicable</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To exercise these rights, please contact us at <a href="mailto:mdrakibhossencse@gmail.com" className="text-[#27548A] dark:text-blue-400 hover:underline">mdrakibhossencse@gmail.com</a>.
          </p>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use cookies and similar tracking technologies to enhance your experience:
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Essential Cookies</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Required for the platform to function properly (authentication, security).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics Cookies</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Help us understand how visitors interact with our platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Preferences Cookies</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Remember your preferences and settings.
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features.
          </p>
        </div>
      ),
    },
    {
      id: "children",
      title: "Children's Privacy",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our services are not intended for individuals under the age of 13 (or the applicable age of majority in your jurisdiction). We do not knowingly collect personal information from children.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you believe we have collected information from a child, please contact us immediately at <a href="mailto:mdrakibhossencse@gmail.com" className="text-[#27548A] dark:text-blue-400 hover:underline">mdrakibhossencse@gmail.com</a>, and we will take steps to delete such information.
          </p>
        </div>
      ),
    },
    {
      id: "international",
      title: "International Data Transfers",
      icon: Globe,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            By using our services, you consent to the transfer of your information to these countries. We take appropriate safeguards to ensure your information receives an adequate level of protection.
          </p>
        </div>
      ),
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Posting the updated policy on our website</li>
            <li>Sending an email notification to the address associated with your account</li>
            <li>Displaying a prominent notice on our platform</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Your continued use of our services after changes become effective constitutes acceptance of the updated policy.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-900 dark:text-white font-semibold mb-2">HobbyHub Privacy Team</p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: <a href="mailto:mdrakibhossencse@gmail.com" className="text-[#27548A] dark:text-blue-400 hover:underline">mdrakibhossencse@gmail.com</a>
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | HobbyHub</title>
        <meta name="description" content="HobbyHub Privacy Policy - Learn how we collect, use, and protect your personal information." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#27548A] to-[#1e3d6b] dark:from-gray-900 dark:to-gray-800 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative w-11/12 mx-auto max-w-7xl px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we protect and handle your personal information.
            </p>
            <p className="text-sm text-gray-300 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="w-11/12 mx-auto max-w-4xl px-4">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="scroll-mt-24"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#27548A]/10 dark:bg-blue-500/20 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-[#27548A] dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  <div className="ml-16">
                    {section.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;

