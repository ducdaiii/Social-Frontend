import React from "react";
import {
  FaProjectDiagram,
  FaComments,
  FaUsers,
  FaVideo,
  FaSearch,
  FaBell,
  FaStar,
  FaMobileAlt,
  FaCode,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="mt-10 mx-auto px-6 py-16 space-y-16 shadow-lg rounded-lg bg-gray-900 text-white">
      {/* Intro Section */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold">SWT</h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          ShareWorkTech is a community-driven platform where developers collaborate on real-world projects,
          share ideas, contribute to open-source, and grow together.
        </p>
      </div>

      {/* Purpose */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🔍 Purpose</h2>
        <p className="text-lg">
          ShareWorkTech empowers developers to <strong>connect</strong>, <strong>build teams</strong>, and
          <strong> contribute</strong> to open-source. Whether you're a student, freelancer, or working professional — 
          you'll find your next meaningful project here.
        </p>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">🚀 Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <FaProjectDiagram className="text-blue-600 text-2xl" />,
              title: "Project Collaboration",
              desc: "Create, join, and manage projects with roles, tags, and modes.",
            },
            {
              icon: <FaComments className="text-purple-600 text-2xl" />,
              title: "Real-time Forums & Messaging",
              desc: "Discuss ideas and manage progress with team-based messaging.",
            },
            {
              icon: <FaUsers className="text-green-600 text-2xl" />,
              title: "User Management",
              desc: "Authentication, profiles, followers, and connection requests.",
            },
            {
              icon: <FaVideo className="text-red-500 text-2xl" />,
              title: "Media Support",
              desc: "Upload images, videos, and files to enrich your project content.",
            },
            {
              icon: <FaSearch className="text-yellow-500 text-2xl" />,
              title: "Smart Filtering",
              desc: "Search by tags, roles, locations, and project status.",
            },
            {
              icon: <FaBell className="text-pink-500 text-2xl" />,
              title: "Email Notifications",
              desc: "Stay up-to-date with project events and invites.",
            },
            {
              icon: <FaStar className="text-indigo-600 text-2xl" />,
              title: "Ranking & Highlights",
              desc: "Featured projects and active contributors are spotlighted.",
            },
            {
              icon: <FaMobileAlt className="text-teal-500 text-2xl" />,
              title: "Responsive UI",
              desc: "Beautiful, mobile-first design with carousels and side cards.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl shadow-sm text-gray-800">
              <div>{item.icon}</div>
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🧠 Technology Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div><strong>Frontend:</strong> React, Tailwind CSS, Redux Toolkit, Swiper.js, Vite</div>
          <div><strong>Backend:</strong> NestJS (TypeScript), MongoDB, Cloudinary, Nodemailer</div>
          <div><strong>Other:</strong> ESLint, Prettier, dotenv, class-validator</div>
        </div>
      </section>

      {/* Development Guidelines */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">⚙️ Development Guidelines</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Modular architecture (pages, components, services, DTOs)</li>
          <li>API caching & lazy loading for performance</li>
          <li>Centralized constants & reusable components</li>
          <li>Semantic HTML, accessibility, and clear naming</li>
          <li>RTK Query for efficient API interactions</li>
        </ul>
      </section>

      {/* Contribution */}
      <section className="text-center mt-16">
        <FaCode className="mx-auto text-4xl text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold">Want to Contribute?</h2>
        <p className="mt-2">
          We welcome all contributors! Whether you’re fixing bugs, suggesting features, or sharing feedback —
          you’re part of the journey.
        </p>
      </section>
    </div>
  );
};

export default About;