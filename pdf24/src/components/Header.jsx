import React, { memo, useState } from "react";
import { ReactComponent as MoonIcon } from "../assets/icons/moon.svg";
import { ReactComponent as StarsIcon } from "../assets/icons/stars.svg";
import { ReactComponent as CheckIcon } from "../assets/icons/check-white.svg";

const Header = ({ darkModeToggle }) => {
  // State to track whether the additional information section is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expansion state
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <header>
      {/* Navigation */}
      <nav className="flex justify-between px-40 py-6 bg-primary-200">
        <h2 className="text-4xl font-istok text-primary-600">
          <span className="font-bold text-black">PDF24</span> Tools
        </h2>
        <div className="flex items-center gap-x-4">
          {/* Desktop version link */}
          <a
            className="hover:underline"
            href="https://www.google.com"
            title="Go to Desktop version"
            aria-label="Desktop version">
            Desktop version
          </a>
          {/* Contact link */}
          <a
            className="hover:underline"
            href="https://www.google.com"
            title="Contact Us"
            aria-label="Contact Us">
            Contact
          </a>
          {/* Dark mode toggle button */}
          <button
            onClick={darkModeToggle}
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode">
            <MoonIcon alt="Dark Mode" />
          </button>
          {/* All PDF Tools button */}
          <button
            className="flex items-center px-3 py-1 text-white rounded-lg bg-primary-600 hover:bg-primary-400"
            onClick={toggleExpansion}
            aria-label="Toggle Additional Information">
            <div title="All PDF Tools" aria-label="All PDF Tools">
              All PDF Tools
            </div>
          </button>
        </div>
      </nav>
      {/* Additional Information */}
      <div
        className={`flex mb-auto items-end justify-between px-40  py-5 bg-primary-600 ${
          isExpanded ? "h-96" : "h-16 overflow-hidden"
        } transition-all duration-500`}>
        <div className="flex items-center gap-4">
          {/* Stars icon */}
          <StarsIcon alt="Stars Icon" />
          {/* Ratings */}
          <div className="text-white">
            4.9 <span className="text-xs">(8,381 votes)</span>
          </div>
        </div>
        {/* Feature list */}
        <ul className="flex gap-5">
          <li className="flex items-center gap-2.5">
            <CheckIcon alt="Check Icon" />{" "}
            <span className="text-white">Free</span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckIcon alt="Check Icon" />{" "}
            <span className="text-white">Online</span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckIcon alt="Check Icon" />{" "}
            <span className="text-white">No Limits</span>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default memo(Header);
