const axios = require("axios");
const FormData = require("form-data");

async function uploadFile(fileBuffer, fileName) {
  const formData = new FormData();
  formData.append("file", fileBuffer, fileName);

  const response = await axios.post(
    "https://filetools13.pdf24.org/client.php?action=upload",
    formData,
    {
      headers: {
        ...formData.getHeaders(),
      },
    }
  );
  return response.data[0];
}

async function startCompression(fileInfo) {
  const payload = {
    files: [fileInfo],
    dpi: 144, // This can be dynamic based on user input
    imageQuality: 75, // This can be dynamic based on user input
    mode: "normal",
    colorModel: "", // This can be dynamic based on user input (color or grey)
  };
  const response = await axios.post(
    "https://filetools13.pdf24.org/client.php?action=compressPdf",
    payload,
    {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.data.jobId;
}

async function waitForCompressionJobCompletion(jobId) {
  let status = "";
  let jobData = null; // This will store the job data
  while (status !== "done") {
    const response = await axios.get(
      `https://filetools13.pdf24.org/client.php?action=getStatus&jobId=${jobId}`
    );
    status = response.data.status;
    if (status === "done") {
      jobData = response.data; // Store the job data
    } else {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before polling again
    }
  }
  if (!jobData) {
    throw new Error("Failed to get job data after compression completed.");
  }
  return jobData;
}

async function downloadResult(job) {
  const compressedPdfPath = `https://filetools13.pdf24.org/client.php?mode=download&action=downloadJobResult&jobId=${job.jobId}`;
  return compressedPdfPath;
}

module.exports = {
  uploadFile,
  startCompression,
  waitForCompressionJobCompletion,
  downloadResult,
};
