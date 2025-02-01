import React, { useState } from "react";
import "./FileUpload.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`upload-button ${loading ? "disabled" : ""}`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {events.length > 0 && (
        <div className="events-container">
          <h3 className="events-title">Extracted Events</h3>
          <ul className="events-list">
            {events.map((event, index) => (
              <li key={index} className="event-item">
                {event.name} - {event.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
