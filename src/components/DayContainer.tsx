import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Checkbox,
  EditableText,
  FormGroup,
  InputGroup,
  Slider,
} from "@blueprintjs/core";
import {
  Alignment,
  Classes,
  Elevation,
  Intent,
} from "@blueprintjs/core/lib/esm/common";
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
  mutation AddWeight(
    $weight: Float!
    $note: String
    $date: String!
    $antihistamine: Boolean
    $sleepRating: Int
    $itchRating: Int
    $boneBroth: Boolean
    $multivitamin: Boolean
    $vitaminD: Boolean
    $fishOil: Boolean
    $probiotic: Boolean
    $collagen: Boolean
    $exercise: Boolean
    $moisturized: Boolean
    $hempOil: Boolean
    $coffee: Boolean
    $alcohol: Boolean
  ) {
    addDay(
      weight: $weight
      note: $note
      date: $date
      antihistamine: $antihistamine
      sleepRating: $sleepRating
      itchRating: $itchRating
      boneBroth: $boneBroth
      multivitamin: $multivitamin
      vitaminD: $vitaminD
      fishOil: $fishOil
      probiotic: $probiotic
      collagen: $collagen
      exercise: $exercise
      moisturized: $moisturized
      hempOil: $hempOil
      coffee: $coffee
      alcohol: $alcohol
    ) {
      id
      weight
      date
      note
      antihistamine
      # sleepRating
      # itchRating
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
  const [multivitaminValue, setMultivitamin] = useState<boolean>(false);
  const [collagenValue, setCollagen] = useState<boolean>(false);
  const [exerciseValue, setExercise] = useState<boolean>(false);
  const [alcoholValue, setAlcohol] = useState<boolean>(false);
  const [antihistamineValue, setAntihistamine] = useState<boolean>(false);
  const [vitaminDValue, setVitaminD] = useState<boolean>(false);
  const [fishOilValue, setFishOil] = useState<boolean>(false);
  const [probioticValue, setProbiotic] = useState<boolean>(false);
  const [coffeeValue, setCoffee] = useState<boolean>(false);
  const [brothValue, setBroth] = useState<boolean>(false);
  const [hempValue, setHemp] = useState<boolean>(false);
  const [moisturizeValue, setMoisturize] = useState<boolean>(false);

  const weekContext = useContext(WeekContext);
  const { selectedDate, days, startDate, endDate } = weekContext;

  const changeWeight = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
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
        sleepRating: sleepValue,
        itchRating: itchValue,
        antihistamine: antihistamineValue,
        boneBroth: brothValue,
        multivitamin: multivitaminValue,
        vitaminD: vitaminDValue,
        fishOil: fishOilValue,
        probiotic: probioticValue,
        collagen: collagenValue,
        exercise: exerciseValue,
        moisturized: moisturizeValue,
        hempOil: hempValue,
        coffee: coffeeValue,
        alcohol: alcoholValue,
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

  const saveDay = () => {
    addDay();
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
          <div className="my-3">
            <div className="mb-2">Sleep (previous night)</div>
            <div className="px-5">
              <Slider
                showTrackFill
                labelStepSize={10}
                onChange={(val) => setSleepValue(val)}
                value={sleepValue}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-2">Itch (previous day)</div>
            <div className="px-5">
              <Slider
                showTrackFill
                labelStepSize={10}
                onChange={(val) => setItchValue(val)}
                value={itchValue}
              />
            </div>
          </div>
          <div className="is-flex is-flex-wrap-wrap has-text-right is-justify-content-center mb-4">
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setAntihistamine(!antihistamineValue)}
              alignIndicator={Alignment.RIGHT}
              checked={antihistamineValue}
              label="Antihistamine"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setCollagen(!collagenValue)}
              alignIndicator={Alignment.RIGHT}
              checked={collagenValue}
              label="Collagen"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setMultivitamin(!multivitaminValue)}
              alignIndicator={Alignment.RIGHT}
              checked={multivitaminValue}
              label="Multivitamin"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setVitaminD(!vitaminDValue)}
              alignIndicator={Alignment.RIGHT}
              checked={vitaminDValue}
              label="Vitamin D"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setFishOil(!fishOilValue)}
              alignIndicator={Alignment.RIGHT}
              checked={fishOilValue}
              label="Fish Oil"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setProbiotic(!probioticValue)}
              alignIndicator={Alignment.RIGHT}
              checked={probioticValue}
              label="Probiotic"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setBroth(!brothValue)}
              alignIndicator={Alignment.RIGHT}
              checked={brothValue}
              label="Bone Broth"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setExercise(!exerciseValue)}
              alignIndicator={Alignment.RIGHT}
              checked={exerciseValue}
              label="Exercise"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setMoisturize(!moisturizeValue)}
              alignIndicator={Alignment.RIGHT}
              checked={moisturizeValue}
              label="Moisturized"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setHemp(!hempValue)}
              alignIndicator={Alignment.RIGHT}
              checked={hempValue}
              label="Hemp Oil"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setCoffee(!coffeeValue)}
              alignIndicator={Alignment.RIGHT}
              checked={coffeeValue}
              label="Coffee"
            />
            <Checkbox
              className="day-container__checkbox mx-2"
              onChange={() => setAlcohol(!alcoholValue)}
              alignIndicator={Alignment.RIGHT}
              checked={alcoholValue}
              label="Alcohol"
            />
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
        <div className="mt-5 mb-4 has-text-centered">
          <Button onClick={() => saveDay()}>Save</Button>
        </div>
      </Card>
    </div>
  );
}
