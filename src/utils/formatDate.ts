import Moment from "moment";

export function formatDate(isoDate: Date | undefined, format: string) {
  const dateStr: string =
    isoDate !== undefined
      ? Moment(isoDate, Moment.ISO_8601).format(format)
      : "";

  return dateStr;
}
