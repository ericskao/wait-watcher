import React, { useState } from "react";
import { DateTime } from "luxon";
import { gql, useMutation } from "@apollo/client";

import "./AddDay.scss";

const ADD_DAY = gql`
  mutation AddDay($weight: Float!, $note: String) {
    addDay(weight: $weight, note: $note) {
      id
      weight
      note
    }
  }
`;

function AddDay() {
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState(DateTime.local().toISODate());
  const [note, setNote] = useState("");

  const [addDay] = useMutation(ADD_DAY);

  const onWeightButtonClick = (change: number) => () => {
    const newWeight = Number(weight) + change;
    setWeight(newWeight);
  };

  const onSave = () => {
    addDay({ variables: addDayVariables });
  };

  const onInputChange = (e: any) => {
    setWeight(e.target.value);
  };

  const onDateChange = (e: any) => {
    setDate(e.target.value);
  };

  const onInputKeyPress = (e: any) => {
    if (e.key === "Enter") {
      addDay({ variables: addDayVariables });
    }
  };

  const onTextAreaChange = (e: any) => {
    setNote(e.target.value);
  };

  const addDayVariables = { weight: Number(weight), note };

  return (
    <div className="container">
      <h1>Weight Watcher</h1>
      <div>
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
                onKeyPress={onInputKeyPress}
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
        <div>
          <div>Notes</div>
          <textarea onChange={onTextAreaChange} value={note} />
        </div>
        <ul>
          Can be boolean or quantity
          <li>Sleep</li>
          <li>Itch level</li>
          <li>Antihistamine</li>
          <li>Water amount</li>
          <li>Food log</li>
        </ul>
      </div>
    </div>
  );
}

export default AddDay;
