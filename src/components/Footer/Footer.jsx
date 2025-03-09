import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#A6CDC6] text-white py-3 shadow-lg fixed bottom-0 left-0 right-0">
      <div className="container mx-auto px-6 flex flex-wrap md:flex-nowrap justify-between items-center">
        
        <div className="text-center md:text-left mb-2 md:mb-0">
          <h2 className="text-xl font-bold text-black">Ahmed Ali</h2>
          <p className="text-sm text-gray-600">Building the Future, One Solution at a Time.</p>
        </div>

        <div className="flex space-x-5">
          <a
            href="https://github.com/ahmedAalii"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-transform transform hover:scale-110"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-ali-muhammed-a07231236/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-transform transform hover:scale-110"
          >
            <FaLinkedinIn size={22} />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-500 mt-1 pt-1 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Ahmed Ali. All rights reserved.
      </div>
    </footer>
  );
}
