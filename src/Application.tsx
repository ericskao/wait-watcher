import React, { useState } from "react";
import "./Application.scss";
import { DateTime } from "luxon";

function Application() {
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState(DateTime.local().toISODate());

  const onWeightButtonClick = (change: number) => () => {
    const newWeight = Number(weight) + change;
    setWeight(newWeight);
  };

  const onSave = () => {
    console.log("clicked");
  };

  const onInputChange = (e: any) => {
    setWeight(e.target.value);
  };

  const onDateChange = (e: any) => {
    setDate(e.target.value);
  };

  return (
    <div className="container">
      <h1>Weight Watcher</h1>
      <div className="mx-auto text-center" style={{ width: "200px" }}>
        <input type="date" onChange={onDateChange} value={date} />
        <div>
          <div>
            <svg
              onClick={onWeightButtonClick(-0.5)}
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-caret-left"
            >
              <path
                fillRule="evenodd"
                d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"
              />
            </svg>
            <input
              className="weight__input"
              type="number"
              onChange={onInputChange}
              value={weight}
              min="0"
              max="500"
            />
            <svg
              onClick={onWeightButtonClick(0.5)}
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-caret-right"
            >
              <path
                fillRule="evenodd"
                d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
              />
            </svg>
          </div>
          <button
            onClick={onSave}
            type="button"
            className="btn btn-primary btn-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Application;
