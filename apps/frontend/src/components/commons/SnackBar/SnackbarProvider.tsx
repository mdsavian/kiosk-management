import * as React from "react";
import CustomSnackbar from ".";
import { AlertColor } from "@mui/material";

type Props = {
  children: React.ReactElement;
};

const SnackbarProvider: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [alertType, setAlertType] = React.useState<AlertColor>("success");

  const closeSnackbar = (event?: unknown, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const displaySnackbar = (message: string | null, alertType?: AlertColor) => {
    setMessage(message ?? "");
    setOpen(message !== null);
    setAlertType(alertType ?? "success");
  };

  return (
    <>
      <SnackbarContext.Provider value={displaySnackbar}>{children}</SnackbarContext.Provider>
      <CustomSnackbar
        open={open}
        message={message}
        alertType={alertType}
        handleClose={closeSnackbar}
      />
    </>
  );
};

export default SnackbarProvider;

export const SnackbarContext = React.createContext(
  (message: string | null, alertType?: AlertColor) => {}
);
