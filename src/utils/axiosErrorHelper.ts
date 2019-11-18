import { message } from "antd";
import { Dispatch } from "redux";

const axiosErrorHelper = (error: any, dispatch?: Dispatch) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    switch (error.response.status) {
      case 400:
      case 401:
      case 409:
        // Unauthorized
        // error.response.data -> 401 Unauthorized null
        message.error(error.response.data.message, 3).then(
          () => {
            if (dispatch) {
              // dispatch()
            }
          },
          (err: any) => null
        );
        break;
      case 404:
        // Unauthorized
        // error.response.data -> 401 Unauthorized null
        message.error(error.response.data.message, 3).then(
          () => {
            if (dispatch) {
              // dispatch()
            }
          },
          (err: any) => null
        );
        break;
    }
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(
      "The request was made but no response was received, error.request:",
      error.request
    );
    message.error(
      "Please check your connection. The request was made but no response was received.",
      10
    );
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log("error.config", error);
};

export { axiosErrorHelper };
