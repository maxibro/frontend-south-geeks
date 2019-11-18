export const required = (value: any) =>
  value || typeof value === "number" ? undefined : "This field is required";

export const number = (value: any) =>
  value && isNaN(Number(value)) ? `Must be a number` : undefined;
