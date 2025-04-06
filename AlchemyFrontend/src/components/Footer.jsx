import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-zinc-300 py-10">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: About Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">About Alchemist</h2>
            <div className="text-sm leading-relaxed space-y-3">
              <p>
                <strong>🧠 What is Academic Adviser?</strong><br/>
                Academic Adviser is an AI-powered platform designed to support students with personalized academic guidance—anytime, anywhere.
              </p>
              <p>
                <strong>🎯 The Problem</strong><br/>
                1. ❌ Limited Staff Availability — Many institutions face a shortage of academic advisers.<br/>
                2. ⏰ Lack of 24/7 Support — Students often need help during late hours.
              </p>
              <p>
                <strong>✅ Our Solution</strong><br/>
                🎮 Gamified Experience — Interactive, rewarding advising.<br/>
                🔗 Smart Linking — Breaks complex queries into manageable parts.<br/>
                🧩 AI Understanding — Personalized recommendations.<br/>
                🧑‍💻 Expert + AI Collaboration — Blending tech and human insight.
              </p>
              <p>
                <strong>🚀 Key Features</strong><br/>
                - 24/7 academic support<br/>
                - Gamified user journey<br/>
                - AI + human expert guidance<br/>
                - Modular problem-solving interface
              </p>
              <p>
                <strong>📌 Ideal For</strong><br/>
                - Universities with high student-to-adviser ratios<br/>
                - Online education platforms<br/>
                - Self-paced learners
              </p>
              <p>
                <strong>🔗 Useful Links</strong><br/>
                <a className="text-blue-400 hover:underline" href="https://mixolydian-neptune-51b.notion.site/Home-Page-1cb319b6085380bfb98cfc74dc970a94?pvs=4" target="_blank">Student Dashboard</a><br/>
                <a className="text-blue-400 hover:underline" href="https://youtu.be/pGUQXlos0QQ" target="_blank">Alchemist AI Working Demo</a>
              </p>
            </div>
          </div>

          {/* Column 2: Social Media */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Connect With Us</h2>
            <p className="text-sm mb-4">Follow Alchemist for updates and announcements:</p>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-zinc-300 hover:text-white transition duration-200">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-zinc-300 hover:text-white transition duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-300 hover:text-white transition duration-200">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-300 hover:text-white transition duration-200">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-zinc-700 pt-6 text-center">
          <p className="text-sm">
            &copy; 2025 Alchemist. All rights reserved. | <a className="hover:underline" href="#">Terms</a> | <a className="hover:underline" href="#">Privacy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
