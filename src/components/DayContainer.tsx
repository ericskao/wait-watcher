import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Checkbox,
  EditableText,
  FormGroup,
  InputGroup,
  Slider,
  TextArea,
} from "@blueprintjs/core";
import { Classes, Elevation, Intent } from "@blueprintjs/core/lib/esm/common";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { find } from "lodash";

import "./DayContainer.scss";
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
  const [note, setNote] = useState<string>("");
  const [sleepValue, setSleepValue] = useState<number>(0);
  const [itchValue, setItchValue] = useState<number>(0);
  const [textAreaValue, setTextArea] = useState<number>(0);
  const weekContext = useContext(WeekContext);
  const { selectedDate, days, startDate, endDate } = weekContext;

  const changeWeight = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const textAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(Number(e.currentTarget.value));
  };

  const addDay = () => {
    console.log("note", note);
    addWeight({
      refetchQueries: [
        { query: WEEK_QUERY, variables: { startDate, endDate } },
      ],
      variables: {
        weight: Number(weight),
        note,
        date: selectedDate.toISODate(),
      },
    });
  };

  const [addWeight] = useMutation(ADD_WEIGHT);

  const submitWeightInput = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    addDay();
  };

  const matchingDate = find(
    days,
    (day: DayType) => day.date === selectedDate.toISODate()
  );

  const confirmText = (text: string) => {
    setNote(text);
    addDay();
  };

  const editNote = (text: string) => {
    setNote(text);
  };

  useEffect(() => {
    if (matchingDate) {
      setWeight(matchingDate.weight.toString());
      setNote(matchingDate.note);
    } else {
      setWeight("");
      setNote("");
    }
  }, [matchingDate]);

  return (
    <div className="day-container">
      <h3 className={Classes.HEADING}>
        {selectedDate?.toFormat("cccc, LLLL L")}
      </h3>
      <Card
        className="day-container__card-info"
        interactive={true}
        elevation={Elevation.TWO}
      >
        <form onSubmit={submitWeightInput}>
          <FormGroup labelFor="weight-input">
            <div className="is-flex">
              <InputGroup
                className="day-container__input"
                id="weight-input"
                large={true}
                leftIcon="dashboard"
                onChange={changeWeight}
                value={weight || ""}
              />
              <Button
                className="day-container__input-save is-align-self-center"
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
          <div>
            <div>Sleep (previous night)</div>
            <Slider
              showTrackFill
              labelStepSize={10}
              onChange={(val) => setSleepValue(val)}
              value={sleepValue}
            />
          </div>
          <div>
            <div>Itch</div>
            <Slider
              showTrackFill
              labelStepSize={10}
              onChange={(val) => setItchValue(val)}
              value={itchValue}
            />
          </div>
          <div className="is-flex is-flex-wrap-wrap">
            <div className="is-flex day-container__checkbox">
              <span className="mr-2">Loratadine</span> <Checkbox />
            </div>
            <div className="is-flex day-container__checkbox">
              <span className="mr-2">Benadryl</span> <Checkbox />
            </div>
            <div className="is-flex day-container__checkbox">
              <span className="mr-2">Multivitamin</span> <Checkbox />
            </div>
            <div
              className="is-flex
            day-container__checkbox"
            >
              <span className="mr-2">Vitamin D</span> <Checkbox />
            </div>
            <div className="is-flex day-container__checkbox">
              <span className="mr-2">Fish oil</span> <Checkbox />
            </div>
          </div>

          <EditableText
            confirmOnEnterKey
            onConfirm={confirmText}
            onChange={editNote}
            multiline={true}
            minLines={1}
            maxLines={12}
            placeholder="Add notes"
            value={note}
          />
        </form>
      </Card>
    </div>
  );
}
