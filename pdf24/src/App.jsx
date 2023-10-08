import logo from "./logo.svg";
import "./App.css";
import Information from "./components/Information";
import Header from "./components/Header";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import FileUploader from "./components/FileUploader";

function App() {
  return (
    <div className="App">
      <Header />
      <FileUploader />
      <Information />
      <Footer />
    </div>
  );
}

export default App;
