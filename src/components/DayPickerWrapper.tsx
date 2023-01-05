import React from 'react';
import { useEffect } from "react";

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import CSS from 'csstype';

const wrapperStyles: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};

const daysBetweenStyles: CSS.Properties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "40px"
};

export default function DayPickerWrapper() {
  const DAY_IN_MS = 1000 * 3600 * 24;
  const [selectedStart, setStartSelected] = React.useState<Date>();
  const [selectedEnd, setEndSelected] = React.useState<Date>();
  const [days, setDays] = React.useState<number>();

  let footerStart = <p>Välj ett startdatum.</p>;
  let footerEnd = <p>Välj ett slutdatum.</p>;
  if (selectedStart) {
    footerStart = <p>Du valde startdatumet {format(selectedStart, 'PP')}.</p>;
  }

  if (selectedEnd) {
    footerEnd = <p>Du valde slutdatumet {format(selectedEnd, 'PP')}.</p>;
  }

  const onDateSelection = function() {
    if (selectedStart && selectedEnd) {
      const msDiff = selectedEnd.getTime() - selectedStart.getTime();
      setDays(Math.abs(msDiff / DAY_IN_MS))
    }
  }

  useEffect(onDateSelection, [selectedStart, selectedEnd])

  return (
    <>
      <div style={wrapperStyles}>
      <DayPicker
        mode="single"
        selected={selectedStart}
        onSelect={setStartSelected}
        footer={footerStart}
      />
      <DayPicker
      mode="single"
      selected={selectedEnd}
      onSelect={setEndSelected}
      footer={footerEnd}
    />
    
    </div>
    <div style={daysBetweenStyles}>
      {days ? `${days} dagar` : "Välj dagar"}
    </div>
    </>
  );
}