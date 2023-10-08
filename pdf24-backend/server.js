const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const multer = require("multer");
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

const pdfCompression = require("./pdfcompression");

const cors = require("cors");
app.use(cors());

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send({ error: err.message });
  } else {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Handle file compression request
app.post("/compress-pdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded." });
    }

    const fileInfo = await pdfCompression.uploadFile(
      req.file.buffer,
      req.file.originalname
    );
    const jobId = await pdfCompression.startCompression(fileInfo);

    const job = await pdfCompression.waitForCompressionJobCompletion(jobId);
    const compressedPdfPath = await pdfCompression.downloadResult(job);

    res.json({ compressedPdfPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Body parsing middleware for handling JSON data
app.use(express.json());

// Your routes for handling PDF compression will go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
