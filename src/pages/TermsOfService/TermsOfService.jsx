import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FileText, Scale, AlertTriangle, Users, CreditCard, Shield, Ban, Gavel } from "lucide-react";

const TermsOfService = () => {
  const sections = [
    {
      id: "agreement",
      title: "Agreement to Terms",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Welcome to HobbyHub. These Terms of Service ("Terms") constitute a legally binding agreement between you and HobbyHub regarding your use of our website, mobile application, and services (collectively, the "Service").
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, then you may not access the Service.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            These Terms apply to all visitors, users, and others who access or use the Service. Your use of the Service is also governed by our Privacy Policy, which is incorporated by reference.
          </p>
        </div>
      ),
    },
    {
      id: "account",
      title: "User Accounts",
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To access certain features of the Service, you must register for an account. When you create an account, you agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and update your information to keep it accurate</li>
            <li>Maintain the security of your password and account</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Be at least 13 years old (or the age of majority in your jurisdiction)</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials. We are not liable for any loss or damage arising from your failure to protect your account information.
          </p>
        </div>
      ),
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use Policy",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Violate any applicable local, state, national, or international law or regulation</li>
            <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>Submit false or misleading information</li>
            <li>Upload or transmit viruses or any other type of malicious code</li>
            <li>Collect or track personal information of others</li>
            <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
            <li>Attempt to gain unauthorized access to the Service or related systems</li>
            <li>Use the Service for any commercial purpose without our express written consent</li>
            <li>Impersonate or attempt to impersonate the company, employees, or other users</li>
          </ul>
        </div>
      ),
    },
    {
      id: "content",
      title: "User-Generated Content",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for Content that you post to the Service.
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Rights</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You retain ownership of any intellectual property rights that you hold in Content you submit, post, or display on the Service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">License to HobbyHub</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By posting Content on the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your Content for the purpose of operating and promoting the Service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Content Standards</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You agree that your Content will not violate any third party's rights, including copyright, trademark, privacy, or other personal or proprietary rights. You also agree that your Content will not be libelous or otherwise illegal, threatening, or obscene.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Content Removal</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right, but are not obligated, to review, screen, and remove Content at our sole discretion. We may remove Content that violates these Terms or is otherwise objectionable.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "events",
      title: "Events and Groups",
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            HobbyHub allows users to create and organize events and groups. When creating or participating in events:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>You are responsible for the accuracy of event information</li>
            <li>You are responsible for ensuring events comply with applicable laws and regulations</li>
            <li>We are not responsible for the conduct of event organizers or participants</li>
            <li>Event organizers are solely responsible for their events and any issues that arise</li>
            <li>You participate in events at your own risk</li>
            <li>We reserve the right to remove events that violate these Terms</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We are not liable for any loss, damage, or injury that occurs at events organized through our platform.
          </p>
        </div>
      ),
    },
    {
      id: "payments",
      title: "Payments and Fees",
      icon: CreditCard,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Certain features of the Service may require payment. When you make a payment:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>You agree to provide current, complete, and accurate purchase and account information</li>
            <li>All purchases are subject to our refund policy, which may vary by service</li>
            <li>Prices are subject to change without notice</li>
            <li>Payment processing is handled by third-party payment processors</li>
            <li>You are responsible for all applicable taxes</li>
            <li>We reserve the right to refuse or cancel orders at our discretion</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If payment processing fails or is refused, we reserve the right to suspend or terminate your access to paid features.
          </p>
        </div>
      ),
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: Scale,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The Service and its original content, features, and functionality are owned by HobbyHub and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent. All other trademarks, service marks, and logos used on the Service are the property of their respective owners.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without prior written consent from us, except as provided in these Terms.
          </p>
        </div>
      ),
    },
    {
      id: "termination",
      title: "Termination",
      icon: Ban,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Upon termination:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Your right to use the Service will immediately cease</li>
            <li>We may delete your account and all associated Content</li>
            <li>Provisions of these Terms that by their nature should survive termination will survive</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You may terminate your account at any time by contacting us or using the account deletion feature in your settings.
          </p>
        </div>
      ),
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
            <li>That the Service will be uninterrupted, timely, secure, or error-free</li>
            <li>That the results obtained from using the Service will be accurate or reliable</li>
            <li>That any errors in the Service will be corrected</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We do not warrant, endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the Service.
          </p>
        </div>
      ),
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL HOBBYHUB, ITS AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SERVICE.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE USE OF THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE MONTHS PRIOR TO THE ACTION GIVING RISE TO LIABILITY, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
          </p>
        </div>
      ),
    },
    {
      id: "indemnification",
      title: "Indemnification",
      icon: Gavel,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You agree to defend, indemnify, and hold harmless HobbyHub, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Your violation of these Terms</li>
            <li>Your use of the Service</li>
            <li>Your violation of any rights of another</li>
            <li>Your violation of any applicable laws or regulations</li>
            <li>Content you submit, post, or transmit through the Service</li>
          </ul>
        </div>
      ),
    },
    {
      id: "governing-law",
      title: "Governing Law",
      icon: Scale,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].
          </p>
        </div>
      ),
    },
    {
      id: "changes",
      title: "Changes to Terms",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you do not agree to the new terms, you are no longer authorized to use the Service.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-900 dark:text-white font-semibold mb-2">HobbyHub Legal Team</p>
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
        <title>Terms of Service | HobbyHub</title>
        <meta name="description" content="HobbyHub Terms of Service - Read our terms and conditions for using our platform." />
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
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Please read these terms carefully before using our platform.
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

export default TermsOfService;

