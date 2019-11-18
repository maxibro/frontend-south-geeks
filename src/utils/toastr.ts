
import { message } from "antd";

export const toastr = {
  showToast: (
    txtMessage: string,
    duration = 3,
    msjType: "info" | "success" | "error" | "warning" | "loading" = "error"
  ) => {
    message.open({ content: txtMessage, duration, type: msjType });
  }
};
