import React from "react";
import "./Application.scss";

function Application() {
  return (
    <div className="container">
      <h1>Weight Watcher</h1>
      <div className="mx-auto text-center" style={{ width: "200px" }}>
        {new Date().toLocaleDateString()}
        <div>
          <div>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-caret-left"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"
              />
            </svg>
            <input type="number" min="1" max="500" />
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-caret-right"
            >
              <path
                fill-rule="evenodd"
                d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
              />
            </svg>
          </div>
          <button type="button" className="btn btn-primary btn-sm">
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Application;
