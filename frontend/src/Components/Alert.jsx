import React, { useState, useEffect } from 'react';
import './Alert.css'; // Import your CSS file for styling

export default function Alert({ alert, handleAlertClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(0);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (progress === 0) {
      handleAlertClose();
    }
  }, [progress, handleAlertClose]);

  return (
    <div className="alert-container">
      <div className="alert-content">
        <div
          className="alert alert-danger"
          role="alert"
        >
          {alert}
          <button
            type="button"
            className="btn-close mx-2"
            onClick={handleAlertClose}
          ></button>
        </div>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
}
