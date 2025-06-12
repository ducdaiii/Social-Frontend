import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-300 bg-gray-900 py-8 text-center">
      <div className="mx-auto px-4 max-w-4xl">
        {/* Grid cho các cột, tiêu đề gần nhau hơn */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {/* Cột 1: About */}
          <div className="group">
            <h3 className="text-white font-semibold mb-2">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Our Story</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Community</a></li>
            </ul>
          </div>

          {/* Cột 2: Apps */}
          <div className="group">
            <h3 className="text-white font-semibold mb-2">Apps</h3>
            <ul className="space-y-2">
              <li><a href="/page201" className="hover:underline">iOS</a></li>
              <li><a href="/page201" className="hover:underline">Android</a></li>
              <li><a href="/" className="hover:underline">Web</a></li>
            </ul>
          </div>

          {/* Cột 3: Support */}
          <div className="group">
            <h3 className="text-white font-semibold mb-2">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          {/* Cột 4: Social Media */}
          <div className="group flex flex-col items-center">
            <h3 className="text-white font-semibold mb-2">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="https://www.facebook.com/doan.duc.dai.2024" className="flex items-center space-x-2 hover:text-white"><FaFacebook size={24} /><span>Facebook</span></a></li>
              <li><a href="https://x.com/DoanDucDaiii" className="flex items-center space-x-2 hover:text-white"><FaTwitter size={24} /><span>Twitter</span></a></li>
              <li><a href="https://www.instagram.com/doanducdaii/" className="flex items-center space-x-2 hover:text-white"><FaInstagram size={24} /><span>Instagram</span></a></li>
            </ul>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="mt-6 text-center text-sm border-t border-gray-700 pt-4">
          <p>© {new Date().getFullYear()} Crypto.network.com. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;