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

const hrStyles: (md: boolean) => CSS.Properties = (md: boolean) => ({
  borderTop: md ? "3px solid grey" : "unset",
  borderLeft: md ? "unset" : "3px solid grey",
  width: md ? "auto" : "0",
  height: md ? "0" : "auto",
  margin: "20px",
});

const footerWrapperStyles: (md: boolean) => CSS.Properties = (md: boolean) => ({
  display: "flex",
  justifyContent: "center",
});

const footerStyles: (md: boolean) => CSS.Properties = (md: boolean) => ({
  width: "auto",
  padding: "5px",
  margin: "30px",
  borderRadius: "10%",
  backgroundColor: "honeydew",
  fontSize: "18px",
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
      <div style={footerWrapperStyles(isMediumScreen)}>
        <div style={footerStyles(isMediumScreen)}>
          {format(selectedStart, "PP")}
        </div>
      </div>
    );
  }

  if (selectedEnd) {
    footerEnd = (
      <div style={footerWrapperStyles(isMediumScreen)}>
        <div style={footerStyles(isMediumScreen)}>
          {format(selectedEnd, "PP")}
        </div>
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
      <div style={wrapperStyles(isMediumScreen)}>
        <DayPicker
          mode="single"
          selected={selectedStart}
          onSelect={setStartSelected}
          footer={footerStart}
        />
        <hr style={hrStyles(isMediumScreen)} />
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
