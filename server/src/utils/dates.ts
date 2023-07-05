import moment from "moment-timezone";

export function formatTime(date: Date) {
  const momentDate = moment(date).tz("America/Sao_Paulo");

  let hours: number | string = momentDate.hours();
  let minutes: number | string = momentDate.minutes();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes;

  const today = moment().tz("America/Sao_Paulo");
  const yesterday = moment(today).subtract(1, "days");

  if (momentDate.isSame(today, "day")) {
    return "Hoje às " + strTime;
  } else if (momentDate.isSame(yesterday, "day")) {
    return "Ontem às " + strTime;
  } else {
    return momentDate.format("DD [de] MMM [de] YYYY [às] HH:mm");
  }
}
