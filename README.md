---

# PDF Compression Tool

## Introduction
This tool provides an easy-to-use interface for compressing PDF files. Built with React on the frontend and Node.js on the backend, it ensures efficient compression without compromising on quality.

## Project Structure
The project is organized as follows:
- **Frontend**: Built with React
  - Main App Component: `App.jsx`
  - File Uploader Component: `FileUploader.jsx`
- **Backend**: Node.js based server
  - Server Entry Point: `server.js`
  - PDF Compression Logic: `pdfCompression.js`

## Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (includes npm)

## Setting Up & Running

### Frontend

1. Navigate to the frontend directory:
   ```
   cd path/to/pdf24
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

### Backend

1. Navigate to the backend directory:
   ```
   cd path/to/pdf24-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Node.js server:
   ```
   node server.js
   ```

Now, open your browser and go to `http://localhost:3000` (or the specified port) to access the PDF Compression Tool.

## Usage

1. Use the `FileUploader` component on the main page to select the PDF file you want to compress.
2. Click on the "Compress" button.
3. Wait for the compression to complete and download the compressed PDF.

---
