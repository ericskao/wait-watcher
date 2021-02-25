import { gql, useMutation } from "@apollo/client";
import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import { Classes, Intent } from "@blueprintjs/core/lib/esm/common";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { find } from "lodash";

import "./DayInput.scss";
import { WeekContext, WEEK_QUERY } from "./WeekView";

const ADD_WEIGHT = gql`
  mutation AddWeight($weight: Float!, $note: String, $date: String!) {
    addDay(weight: $weight, note: $note, date: $date) {
      id
      weight
      date
      note
    }
  }
`;

type DayType = {
  date: string;
  id: string;
  note: string;
  weight: number;
};

export default function DayInput() {
  const [weight, setWeight] = useState<string | null>(null);
  const weekContext = useContext(WeekContext);
  const { selectedDate, days, startDate, endDate } = weekContext;

  const changeWeight = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const [addWeight] = useMutation(ADD_WEIGHT);

  const submitWeightInput = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    addWeight({
      refetchQueries: [
        { query: WEEK_QUERY, variables: { startDate, endDate } },
      ],
      variables: {
        weight: Number(weight),
        note: "",
        date: selectedDate.toISODate(),
      },
    });
  };

  const matchingDate = find(
    days,
    (day: DayType) => day.date === selectedDate.toISODate()
  );

  console.log("weekcontext", weekContext);
  return (
    <div className="day-input">
      <h3 className={Classes.HEADING}>
        {selectedDate?.toFormat("cccc, LLLL L")}
      </h3>
      <form onSubmit={submitWeightInput}>
        <FormGroup labelFor="weight-input">
          <div className="is-flex">
            <InputGroup
              className="day-input__input"
              id="weight-input"
              large={true}
              leftIcon="dashboard"
              onChange={changeWeight}
              value={weight || matchingDate?.weight.toString()}
            />
            <Button
              className="day-input__input-save is-align-self-center"
              onClick={submitWeightInput}
              rightIcon="tick"
              disabled={!weight}
              intent={
                !!weight &&
                parseInt(weight) > 0 &&
                Number(weight) !== matchingDate?.weight
                  ? Intent.SUCCESS
                  : Intent.NONE
              }
              type="button"
            />
          </div>
        </FormGroup>
      </form>
      {matchingDate && (
        <div className="day-input__data">
          <div>{matchingDate.weight}</div>
        </div>
      )}
    </div>
  );
}
