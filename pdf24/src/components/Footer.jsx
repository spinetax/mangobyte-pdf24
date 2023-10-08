import React from "react";

const Footer = () => {
  const tools = [
    "Merge PDF",
    "Split PDF",
    "Compress PDF",
    "Edit PDF",
    "Sign PDF",
    "PDF Converter",
    "Convert to PDF",
    "Images to PDF",
    "PDF to Images",
    "Extract PDF Images",
    "Protect PDF",
    "Unlock PDF",
    "Rotate PDF pages",
    "Remove PDF pages",
    "Extract PDF pages",
    "Sort PDF pages",
    "Webpage to PDF",
    "Create PDF job application",
    "Create PDF with camera",
    "PDF OCR",
    "Add watermark",
    "Add page numbers",
    "View as PDF",
    "PDF Overlay",
    "Compare PDFs",
    "Web optimize PDF",
    "Annotate PDF",
    "Redact PDF",
    "Create PDF",
    "PDF 24 Creator",
    "PDF Printer",
    "PDF Reader",
    "Create invoice",
    "Remove PDF metadata",
    "Flatten PDF",
    "Crop PDF",
  ];

  const columns = [[], [], [], [], [], []];
  tools.forEach((tool, index) => {
    const column = index % 6;
    columns[column].push(tool);
  });

  return (
    <footer className="mt-24">
      <div className="px-40">
        <h3 className="text-neutral-800 text-2xl border-t text-start font-bold border-primary-600 pt-6">
          All Tools
        </h3>
        <nav className="grid grid-cols-6 grid-rows-7 text-start my-8 mb-16 gap-x-4">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`col-span-1 ${
                columnIndex < 5 ? "border-r pr-4" : ""
              }`}>
              {column.map((tool, index) => (
                <div key={index} className={`${index > 0 ? "mt-2" : ""}`}>
                  <a
                    href={`/tool/${tool}`}
                    className="text-neutral-700 text-sm hover:underline">
                    {tool}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </nav>
        <nav className="text-center justify-center flex gap-12 my-4">
          <a href="/about-us" className="text-neutral-200 text-sm">
            About us
          </a>
          <a href="/help" className="text-neutral-200 text-sm">
            Help
          </a>
          <a href="/contact" className="text-neutral-200 text-sm">
            Contact
          </a>
        </nav>
        <nav className="text-center justify-center flex gap-12 my-4">
          <a href="/legal" className="text-neutral-200 text-sm">
            Legal Notice
          </a>
          <a href="/terms-of-use" className="text-neutral-200 text-sm">
            Terms of use
          </a>
          <a href="/privacy-policy" className="text-neutral-200 text-sm">
            Privacy Policy
          </a>
          <a href="/privacy-settings" className="text-neutral-200 text-sm">
            Privacy Settings
          </a>
        </nav>
      </div>
      <div className="bg-primary-200">
        <div className="text-primary-700 text-sm py-2.5">
          © 2022 Geek Software GmbH — WE love PDF
        </div>
      </div>
    </footer>
  );
};

export default Footer;
