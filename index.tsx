
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  console.error("Critical Error: Root element '#root' not found.");
} else {
  try {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err: any) {
    console.error("React Mounting Error:", err);
    container.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; text-align: center;">
        <h1 style="color: #e11d48; font-family: serif;">Initialization Error</h1>
        <p style="color: #64748b;">${err.message || 'An unknown error occurred during startup.'}</p>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #1a1a1a; color: white; border: none; cursor: pointer;">
          Retry Loading
        </button>
      </div>
    `;
  }
}
