import "react-day-picker/dist/style.css";
import CSS from "csstype";

type Props = {
  days: number | undefined;
  start: Date | undefined;
  end: Date | undefined;
  isMediumScreen: boolean;
};

const daysBetweenStyles: (md: boolean) => CSS.Properties = (md: boolean) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: md ? "30px" : "40px",
  padding: "15px",
  backgroundColor: "honeydew",
  border: "1px solid grey",
  borderLeft: "none",
  borderRight: "none",
});

const sunsStyles: (md: boolean) => CSS.Properties = (md: boolean) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: md ? "10px" : "20px",
  paddingTop: "10px",
  maxWidth: "630px",
  overflowY: "scroll",
  margin: 0,
});

const printDayEmojis = function (days?: number) {
  return days
    ? Array.from(new Array(days)).map((_, i) => (i % 2 ? "🌝" : "🌞"))
    : undefined;
};

export default function Days({ days, start, end, isMediumScreen }: Props) {
  const renderDays = function () {
    let content = "👇 Välj datum 👇";
    let suns = printDayEmojis(days);

    if (days !== undefined) {
      if (days === 0) {
        content = "👏🧠💀🧌";
      } else {
        content = `${days} ${days > 1 ? "dagar" : "dag"}`;
      }
    }

    if (!start && !end) {
      content = "👇 Välj datum 👇";
    }
    if (start && !end) {
      content = "Välj datum till 👇";
    }
    if (!start && end) {
      content = "👇 Välj datum från";
    }

    return (
      <>
        <strong>{content}</strong>
        <div style={sunsStyles(isMediumScreen)}>{suns}</div>
      </>
    );
  };
  return <div style={daysBetweenStyles(isMediumScreen)}>{renderDays()}</div>;
}
