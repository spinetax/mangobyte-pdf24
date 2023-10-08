import React, { useState } from "react";
import { ReactComponent as ArrowDownIcon } from "../assets/icons/arrow-down.svg";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="my-8 mx-4 mt-16 sm:mx-40">
      {/* FAQ Question */}
      <div
        className={`bg-white cursor-pointer border border-l-[1rem] border-primary-600 p-4 transition-colors ${
          isOpen ? "bg-primary-200 " : ""
        }`}
        onClick={toggleOpen}>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-semibold text-primary-600">
            {question}
          </div>
          <div className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
            <ArrowDownIcon />
          </div>
        </div>
      </div>

      {/* FAQ Answer */}
      <div
        className={`bg-primary-600 text-white overflow-hidden transition-opacity transition-max-h ${
          isOpen
            ? "opacity-100 max-h-full ease-out duration-300 p-4"
            : "opacity-0 max-h-0 ease-in duration-300"
        }`}>
        {answer}
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "FAQ",
      answer: "This is an example FAQ section.",
    },
  ];

  return (
    <div className="faq-container">
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;
