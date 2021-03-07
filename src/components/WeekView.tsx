import { DateTime, Interval } from "luxon";
import cx from "classnames";
import React, { useState } from "react";
import { days } from "../javascript/utils/getDaysArray";

import "./WeekView.scss";
import DayContainer from "./DayContainer";
import { gql, useQuery } from "@apollo/client";
import { Icon } from "@blueprintjs/core";

export const WEEK_QUERY = gql`
  query WeekQuery($startDate: String, $endDate: String) {
    days(startDate: $startDate, endDate: $endDate) {
      id
      date
      weight
      note
    }
  }
`;

export const WeekContext = React.createContext({
  startDate: DateTime.local().startOf("week").toISODate(),
  endDate: DateTime.local().endOf("week").toISODate(),
  selectedDate: DateTime.local(),
  days: [],
});

export default function WeekView() {
  const dt = DateTime.local();
  const month = dt.toFormat("LLLL y");

  const [week, setWeek] = useState(0);
  const interval = Interval.fromDateTimes(
    dt.plus({ week: week }).startOf("week"),
    dt.plus({ week }).endOf("week")
  );

  const [selectedDate, setDate] = useState(dt);
  const startDate = dt.startOf("week").plus({ week }).toISODate();
  const endDate = dt.endOf("week").plus({ week }).toISODate();

  const { loading, data } = useQuery(WEEK_QUERY, {
    variables: {
      startDate,
      endDate,
    },
  });

  const changeWeek = (newWeek: number) => () => {
    setWeek(week + newWeek);
  };

  console.log("loading", loading, "data", data);

  return (
    <WeekContext.Provider
      value={{ selectedDate, startDate, endDate, days: data?.days }}
    >
      <div className="week-view">
        <div className="mb-4 has-text-weight-bold">{month}</div>
        <div className="week-view__row px-4 is-flex is-align-items-center">
          <Icon icon="chevron-left" onClick={changeWeek(-1)} />
          {Array.from(days(interval)).map((day, index) => {
            const classname = cx("has-text-weight-bold", {
              "week-view__day--selected-date": selectedDate.hasSame(day, "day"),
              "week-view__day--non-selected-date": !selectedDate.hasSame(
                day,
                "day"
              ),
            });
            return (
              <div
                key={index}
                className="week-view__day has-text-centered"
                onClick={() => setDate(day)}
              >
                <div className="has-text-silver-gray">
                  {day.toFormat("ccc")}
                </div>
                <div className={classname}>{day.toFormat("d")}</div>
              </div>
            );
          })}
          <Icon icon="chevron-right" onClick={changeWeek(1)} />
        </div>
        <DayContainer />
      </div>
    </WeekContext.Provider>
  );
}
