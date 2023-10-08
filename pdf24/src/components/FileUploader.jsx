import React, { useCallback, useState } from "react";

import { ReactComponent as LoupeIcon } from "../assets/icons/loupe.svg";
import { ReactComponent as PageIcon } from "../assets/icons/page.svg";
import { ReactComponent as RestartIcon } from "../assets/icons/restart.svg";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";
import axios from "axios";
import dropboxDriveImage from "../assets/images/dropbox-drive.png";
import logoImage from "../assets/images/logo.jpg";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [fileSizes, setFileSizes] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [dpi, setDpi] = useState(150);
  const [imageQuality, setImageQuality] = useState(50);
  const [colorMode, setColorMode] = useState("color");
  const [step, setStep] = useState(1);
  const [compressedPdfPaths, setCompressedPdfPaths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    handleFilesChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const handleCompression = async () => {
    setIsLoading(true);

    try {
      if (!selectedFiles.length) {
        alert("Please select a file before compressing.");
        return;
      }

      const compressPdf = async (selectedFile) => {
        const formData = new FormData();
        formData.append("pdf", selectedFile);
        formData.append("dpi", dpi);
        formData.append("imageQuality", imageQuality);
        formData.append("colorMode", colorMode);

        const response = await axios.post("/compress-pdf", formData);
        const data = await response.data;
        if (!data.compressedPdfPath) {
          throw Error("Error compressing the PDF");
        }

        return data.compressedPdfPath;
      };

      const downloadLinks = await Promise.all(
        selectedFiles.map(async (selectedFile) => {
          const downloadLink = await compressPdf(selectedFile);
          console.log(downloadLink);
          return downloadLink;
        })
      );

      setCompressedPdfPaths(downloadLinks);
      setStep(3);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Error compressing the PDF.");
    }
  };

  const handleFilesChange = async (files) => {
    // const files = event.target.files || event.dataTransfer.files;

    const validFiles = Array.from(files).filter(
      (file) => file.type === "application/pdf"
    );

    if (validFiles.length) {
      setSelectedFiles(validFiles);
      const names = validFiles.map((file) => file.name);
      const sizes = validFiles.map(
        (file) => (file.size / 1024 / 1024).toFixed(2) + " MB"
      );
      setFileNames(names);
      setFileSizes(sizes);

      const createThumbnail = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.readAsDataURL(file);
        });
      };

      const thumbData = await Promise.all(validFiles.map(createThumbnail));
      setThumbnails(thumbData);
      setStep(2);
    } else {
      alert("Please upload valid PDF files.");
    }
  };

  const handleRemoveFile = (index) => {
    const newFileNames = [...fileNames];
    const newFileSizes = [...fileSizes];
    const newThumbnails = [...thumbnails];

    newFileNames.splice(index, 1);
    newFileSizes.splice(index, 1);
    newThumbnails.splice(index, 1);

    setFileNames(newFileNames);
    setFileSizes(newFileSizes);
    setThumbnails(newThumbnails);
  };

  const handleOpenFile = (index) => {
    window.open(thumbnails[index], "_blank");
  };

  return (
    <div className="px-40">
      <div className="grid items-center grid-cols-5 gap-4 my-8">
        <div className="col-span-2 text-start">
          <h1 className="text-4xl font-bold">Compress PDF</h1>
          <div className="text-neutral-700">
            PDF compressor to reduce the size of PDF files quickly and easily
          </div>
        </div>
        <div className="flex justify-center col-span-1">
          <img src={logoImage} alt="Logo" className="w-20" />
        </div>
        <div className="col-span-2"></div>
      </div>

      <div className="relative w-full">
        <div className="absolute top-0 left-0 right-0 z-20 grid grid-cols-3 p-4 font-bold">
          <div className="flex justify-start">
            <div
              className={`px-4 py-1 border rounded-full ${
                step === 1
                  ? "text-primary-600 border-primary-600"
                  : "text-neutral-200 border-neutral-200"
              }`}
            >
              1. Upload your PDFs
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className={`px-4 py-1 border rounded-full ${
                step === 2
                  ? "text-primary-600 border-primary-600"
                  : "text-neutral-200 border-neutral-200"
              }`}
            >
              2. Choose your compression
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className={`px-4 py-1 border rounded-full ${
                step === 3
                  ? "text-primary-600 border-primary-600"
                  : "text-neutral-200 border-neutral-200"
              }`}
            >
              3. Done
            </div>
          </div>
        </div>

        {step === 1 && (
          <div
            className="relative w-full mb-24 border-4 border-dotted border-primary-400 bg-primary-200 h-96 rounded-xl"
            {...getRootProps()}
          >
            <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <div className="flex flex-col items-center gap-2">
                <PageIcon />
                <button className="px-8 py-4 mb-1.5 text-xl rounded w-44 bg-secondary-500 text-neutral-800">
                  Select files
                </button>
              </div>
              <div className="text-xs text-neutral-600">
                or drag and drop file into this area
              </div>
              <img
                src={dropboxDriveImage}
                alt="Dropbox & Google Drive logo"
                className="w-1/2 mx-auto my-1"
              />
              <input
                className="hidden"
                type="file"
                multiple="multiple"
                {...getInputProps()}
              />
            </div>
            <div className="absolute space-y-2 bottom-4 left-4">
              {fileNames.map((name, idx) => (
                <div key={idx} className="p-2 bg-white rounded-md">
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="relative w-full h-auto pb-8 border bg-primary-200 border-primary-200 rounded-t-xl">
              {/* File Thumbnails */}
              <div className="flex flex-wrap justify-center mt-20">
                {thumbnails.map((src, idx) => (
                  <div
                    key={idx}
                    className={`relative m-4 mb-8 mx-10 w-40 h-[226.5px] ${
                      idx < thumbnails.length - 1 ? "mb-8" : ""
                    }`}
                  >
                    <embed
                      src={src}
                      type="application/pdf"
                      className="w-full h-full"
                    />
                    <span
                      className="absolute p-2 cursor-pointer -top-9 -right-9"
                      onClick={() => handleRemoveFile(idx)}
                    >
                      <TrashIcon />
                    </span>
                    <span
                      className="absolute p-2 cursor-pointer -top-9 -left-9"
                      onClick={() => handleOpenFile(idx)}
                    >
                      <LoupeIcon />
                    </span>
                    <div className="absolute -bottom-12 left-[20%] p-2 text-center">
                      <p className="w-20 overflow-hidden text-sm whitespace-nowrap">
                        {fileNames[idx].length > 8
                          ? `${fileNames[idx].substring(0, 8)}...`
                          : fileNames[idx]}
                      </p>
                      <p className="text-xs">({fileSizes[idx]})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Compression Settings */}
            <div className="relative border border-t-0 border-dashed border-primary-400 rounded-b-xl h-[85px]">
              <div className="w-full m-auto max-w-[721px] font-bold">
                <div className="text-base text-start ">
                  Level of compression
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex justify-between w-full m-auto gap-[24px] max-w-[789px] px-[34px] mt-[40px] bg-white absolute bottom-0 transform translate-y-1/2">
                  <div className="text-xs whitespace-pre text-start">
                    Small size
                    <br />
                    Low quality
                  </div>
                  <div className="relaive w-full min-w-max max-w-[530px]">
                    <input
                      type="range"
                      className="relative appearance-none w-full max-w-[530px] bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-[4px]  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6750A4] [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:top-1/2 [&::-webkit-slider-thumb]:transform [&::-webkit-slider-thumb]:-translate-y-1/2"
                      style={{
                        background: `linear-gradient(to right, #6750A4 0%, #6750A4 var(--value, ${imageQuality}%) 0, #E7E0EC 0)`,
                      }}
                      step={10}
                      value={imageQuality}
                      onChange={(e) => {
                        setDpi(e.target.value * 3);
                        setImageQuality(e.target.value);
                      }}
                    />

                    {/* <div className="bg-[#6750A4] w-full h-[4px] absolute left-0"></div> */}
                  </div>

                  <div className="text-xs whitespace-pre text-start">
                    Big size
                    <br />
                    High quality
                  </div>
                </div>
              </div>
            </div>

            <div className="w-2/3 p-4 mx-auto border rounded border-primary-400 bg-primary-200 mt-[33px]">
              <div className="mb-4 text-xl">Compression settings</div>
              <div className="flex justify-between">
                <div className="">
                  DPI{" "}
                  <input
                    type="number"
                    value={dpi}
                    onChange={(e) => setDpi(e.target.value)}
                    className="w-24 p-2 mt-2 border"
                  />
                </div>
                <div>
                  Image Quality{" "}
                  <input
                    type="number"
                    value={imageQuality}
                    onChange={(e) => setImageQuality(e.target.value)}
                    className="w-24 p-2 mt-2 border"
                  />
                </div>
                <div className="flex items-center">
                  <span className="mr-4">Color</span>
                  <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchChecked"
                    onChange={() =>
                      setColorMode(colorMode === "color" ? "grey" : "color")
                    }
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="flexSwitchChecked"
                  ></label>

                  <span className="ml-4">Grey</span>
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="mt-4 text-center">
                <div className="spinner"></div>
                <p className="mt-2 mb-8 text-gray-500">
                  Compressing PDF, please wait...
                </p>
              </div>
            ) : (
              <button
                onClick={handleCompression}
                className="px-8 py-2 mt-4 mb-8 rounded text-neutral-800 bg-secondary-500"
              >
                Compress
              </button>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="relative flex items-center justify-center mb-16 border h-96 bg-primary-200 border-primary-600 rounded-xl">
            <div>
              <div className="w-full text-center">
                <div className="flex justify-center">
                  <svg
                    width="28"
                    height="35"
                    viewBox="0 0 28 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 35C2.5375 35 1.71383 34.6576 1.029 33.9728C0.343 33.2868 0 32.4625 0 31.5V11.9437C0 11.4771 0.0875002 11.032 0.2625 10.6085C0.4375 10.1862 0.685416 9.81458 1.00625 9.49375L9.49375 1.00625C9.81458 0.685417 10.1862 0.4375 10.6085 0.2625C11.032 0.0875002 11.4771 0 11.9437 0H24.5C25.4625 0 26.2868 0.342416 26.9727 1.02725C27.6576 1.71325 28 2.5375 28 3.5V31.5C28 32.4625 27.6576 33.2868 26.9727 33.9728C26.2868 34.6576 25.4625 35 24.5 35H3.5ZM14 25.5063C14.2333 25.5063 14.4521 25.4695 14.6562 25.396C14.8604 25.3237 15.05 25.2 15.225 25.025L19.8188 20.4312C20.1396 20.1104 20.3 19.7167 20.3 19.25C20.3 18.7833 20.125 18.375 19.775 18.025C19.4542 17.7042 19.0458 17.5362 18.55 17.521C18.0542 17.507 17.6458 17.675 17.325 18.025L15.75 19.5125V14C15.75 13.5042 15.5826 13.0882 15.2478 12.7522C14.9118 12.4174 14.4958 12.25 14 12.25C13.5042 12.25 13.0888 12.4174 12.754 12.7522C12.418 13.0882 12.25 13.5042 12.25 14V19.5125L10.675 17.9812C10.325 17.6604 9.91667 17.5 9.45 17.5C8.98333 17.5 8.575 17.675 8.225 18.025C7.90417 18.3458 7.74375 18.7542 7.74375 19.25C7.74375 19.7458 7.90417 20.1542 8.225 20.475L12.775 25.025C12.95 25.2 13.1396 25.3237 13.3438 25.396C13.5479 25.4695 13.7667 25.5063 14 25.5063Z"
                      fill="#232323"
                    />
                  </svg>
                </div>
                <div className="text-lg font-bold">Your files are ready</div>
                {fileNames.map((fileName, i) => (
                  <div className="text-sm" key={i}>
                    {fileName}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-5 mt-[8px]">
                <button
                  type="button"
                  onClick={() =>
                    compressedPdfPaths.map((url) => window.open(url, "_blank"))
                  }
                  className="px-8 py-2 h-[48px] rounded text-neutral-800 bg-secondary-500"
                >
                  Download
                </button>

                <button
                  type="button"
                  onClick={() =>
                    compressedPdfPaths.map((url) => window.open(url, "_blank"))
                  }
                  className="px-8 py-2 h-[48px] rounded text-secondary-500 border border-secondary-500"
                >
                  Preview
                </button>

                <a
                  href="/"
                  className="inline-block px-8 h-[48px] rounded text-neutral-800 bg-secondary-500"
                >
                  Continue in
                  <br />
                  another tool
                </a>
              </div>

              <div className="flex justify-center gap-6 mt-4 text-sm">
                <button
                  type="button"
                  className="flex items-center gap-1 text-red-400"
                  onClick={() => window.location.reload()}
                >
                  <TrashIcon />
                  Delete
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 text-black"
                  onClick={() => window.location.reload()}
                >
                  <RestartIcon />
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
