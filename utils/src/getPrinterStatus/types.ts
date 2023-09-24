export type StatusRequestResult = {
  result: "success" | "con_error" | "con_timeout";
  message?: string;
};
