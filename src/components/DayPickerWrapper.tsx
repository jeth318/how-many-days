import React from "react";
import { useEffect } from "react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useMediaPredicate } from "react-media-hook";

import "react-day-picker/dist/style.css";

import CSS from "csstype";

const wrapperStyles: (md: boolean) => CSS.Properties = (md: boolean) => ({
  display: "flex",
  minWidth: "320px",
  flexDirection: md ? "column" : "row",
  justifyContent: "center",
});

const daysBetweenStyles: (md: boolean) => CSS.Properties = (md: boolean) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: md ? "30px" : "40px",
  padding: "10px",
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

  let footerStart = <p>Välj ett startdatum.</p>;
  let footerEnd = <p>Välj ett slutdatum.</p>;
  if (selectedStart) {
    footerStart = <p>Du valde startdatumet {format(selectedStart, "PP")}.</p>;
  }

  if (selectedEnd) {
    footerEnd = <p>Du valde slutdatumet {format(selectedEnd, "PP")}.</p>;
  }

  const onDateSelection = function () {
    if (selectedStart && selectedEnd) {
      const msDiff = selectedEnd.getTime() - selectedStart.getTime();
      console.log(Math.round(Math.abs(msDiff / DAY_IN_MS)));
      setDays(Math.round(Math.abs(msDiff / DAY_IN_MS)));
    }
  };

  useEffect(onDateSelection, [selectedStart, selectedEnd, DAY_IN_MS]);
  const renderDays = function () {
    if (days !== undefined) {
      if (days === 0) {
        return <div>👏🧠💀🧌</div>;
      } else {
        return <div>{days} dagar 🤌</div>;
      }
    }

    if (!selectedStart && !selectedEnd) {
      return <div>👇 Välj datumspann 👇</div>;
    }
    if (selectedStart && !selectedEnd) {
      return <div>Välj datum till 👇</div>;
    }
    if (!selectedStart && selectedEnd) {
      return <div>👇 Välj datum från</div>;
    }
  };
  return (
    <>
      <div style={daysBetweenStyles(isMediumScreen)}>{renderDays()}</div>
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
