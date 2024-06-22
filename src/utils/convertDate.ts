export function dateMilisecondsToISO(dateMiliseconds: number | undefined) {
  if (!dateMiliseconds) return "";

  const date = new Date();

  const timezoneOffset = date.getTimezoneOffset();

  const adjustedDate = new Date(dateMiliseconds - timezoneOffset * 60 * 1000);

  return adjustedDate.toISOString().slice(0, 16).replace("T", " ");
}

export function dateMilisecondsToString(
  dateMiliseconds: number | undefined,
  format: "short" | "long" = "long",
) {
  if (!dateMiliseconds) return "";

  return format === "long"
    ? new Date(dateMiliseconds).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      })
    : new Date(dateMiliseconds).toLocaleString("en-US", {
        year: "2-digit",
        month: "short",
        day: "numeric",
      });
}

export function dateISOToMiliseconds(dateISO: string | undefined) {
  if (!dateISO) return 0;

  return new Date(dateISO).getTime();
}
