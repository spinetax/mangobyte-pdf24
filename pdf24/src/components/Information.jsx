import React from "react";
import { ReactComponent as CheckStrokeIcon } from "../assets/icons/check-stroke.svg";
import { ReactComponent as CompressToolIcon } from "../assets/icons/compress-tool.svg";
import { ReactComponent as AdjustIcon } from "../assets/icons/adjust.svg";
import { ReactComponent as StarIcon } from "../assets/icons/star.svg";
import { ReactComponent as ComputerIcon } from "../assets/icons/computer.svg";
import { ReactComponent as CloudIcon } from "../assets/icons/cloud.svg";
import { ReactComponent as LockIcon } from "../assets/icons/lock.svg";

// Information component
const Information = () => {
  return (
    // Information Section
    <section className="px-8 sm:px-52 mx-auto bg-primary-200 text-start">
      {/* Section Title */}
      <h1 className="pt-10 mb-4 text-3xl font-bold text-center">Information</h1>

      {/* Operating Systems List */}
      <div className="flex items-center gap-6 p-2 mx-auto mb-6 bg-white rounded-full px-7 w-min">
        <div className="flex items-center gap-1.5">
          <CheckStrokeIcon /> Windows
        </div>
        <div className="flex items-center gap-1.5">
          <CheckStrokeIcon /> Linux
        </div>
        <div className="flex items-center gap-1.5">
          <CheckStrokeIcon /> MAC
        </div>
        <div className="flex items-center gap-1.5">
          <CheckStrokeIcon /> iPhone
        </div>
        <div className="flex items-center gap-1.5">
          <CheckStrokeIcon /> Android
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 p-5 pb-14">
        {informationItems.map((item, index) => (
          // Information Item
          <div
            key={index}
            className="flex flex-col gap-3 p-5 border rounded-md border-primary-600">
            <div className="flex justify-between">
              {/* Information item title */}
              <h3 className="w-48 h-12 mb-2 text-xl font-bold">{item.title}</h3>
              {/* Icon associated with the item */}
              {item.icon}
            </div>
            {/* Description of the information item */}
            <p className="w-11/12 pb-2 text-sm text-primary-700">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Array of information items
const informationItems = [
  {
    title: "How to compress PDF files",
    icon: <CompressToolIcon />,
    description:
      "Select your PDF files which you would like to compress or drop them into the file box and start the compression. A few seconds later you can download your compressed PDF files.",
  },
  {
    title: "Adjustable quality",
    icon: <AdjustIcon />,
    description:
      "You can adjust the compression quality so that you can tune the compression algorithm in order to get a perfect result. PDF files with images can be compressed better than PDF files with text only.",
  },
  {
    title: "Easy to use",
    icon: <StarIcon />,
    description:
      "PDF24 makes it as easy and fast as possible for you to compress your files. You don't need to install any software, you only have to select your files and start the compression.",
  },
  {
    title: "Runs on your system",
    icon: <ComputerIcon />,
    description:
      "The compression tool does not need any special system in order to compress your PDF files. The app is browser-based and works under all operating systems.",
  },
  {
    title: "No installation required",
    icon: <CloudIcon />,
    description:
      "You do not need to download and install any software. PDF files are compressed in the cloud on our servers. The app does not consume your system resources.",
  },
  {
    title: "Secure online compression",
    icon: <LockIcon />,
    description:
      "The compression tool does not keep your files longer than necessary on our server. Your files and results will be deleted from our server after a short period of time.",
  },
];

export default Information;
