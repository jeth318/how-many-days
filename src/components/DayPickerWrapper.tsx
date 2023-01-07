import React from "react";
import { useEffect } from "react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useMediaPredicate } from "react-media-hook";

import Days from "./Days";

import "react-day-picker/dist/style.css";

import CSS from "csstype";

const wrapperStyles: (md: boolean) => CSS.Properties = (md: boolean) => ({
  display: "flex",
  minWidth: "320px",
  flexDirection: md ? "column" : "row",
  justifyContent: "center",
});

const vhrStyles: (md: boolean) => CSS.Properties = (md: boolean) => ({
  borderTop: md ? "3px solid grey" : "unset",
  borderLeft: md ? "unset" : "3px solid grey",
  width: md ? "auto" : "0",
  height: md ? "0" : "auto",
  margin: "20px",
});

export default function DayPickerWrapper() {
  const DAY_IN_MS = 1000 * 3600 * 24;
  const [selectedStart, setStartSelected] = React.useState<Date>();
  const [selectedEnd, setEndSelected] = React.useState<Date>();
  const [days, setDays] = React.useState<number>();

  const isMediumScreen = useMediaPredicate("(max-width: 680px)");

  let footerStart = <h1>🦥</h1>;
  let footerEnd = <h1>🦥</h1>;
  if (selectedStart) {
    footerStart = (
      <div>
        <p>Du valde startdatumet</p>
        <p>{format(selectedStart, "PP")}</p>
      </div>
    );
  }

  if (selectedEnd) {
    footerEnd = (
      <div>
        <p>Du valde slutdatumet</p>
        <p>{format(selectedEnd, "PP")}</p>
      </div>
    );
  }

  const onDateSelection = function () {
    if (selectedStart && selectedEnd) {
      const msDiff = selectedEnd.getTime() - selectedStart.getTime();
      setDays(Math.round(Math.abs(msDiff / DAY_IN_MS)));
    }
  };

  useEffect(onDateSelection, [selectedStart, selectedEnd, DAY_IN_MS]);

  return (
    <>
      <Days
        days={days}
        start={selectedStart}
        end={selectedEnd}
        isMediumScreen={isMediumScreen}
      />
      <hr />
      <div style={wrapperStyles(isMediumScreen)}>
        <DayPicker
          mode="single"
          selected={selectedStart}
          onSelect={setStartSelected}
          footer={footerStart}
        />
        <div style={vhrStyles(isMediumScreen)}></div>
        <DayPicker
          mode="single"
          selected={selectedEnd}
          onSelect={setEndSelected}
          footer={footerEnd}
        />
      </div>
    </>
  );
}
