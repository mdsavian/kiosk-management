import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import useKiosks from "../hooks/useKiosks";
import { KioskDTO } from "types";
import { SnackbarContext } from "./common/SnackBar/SnackbarProvider";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  kioskId: string;
  handleClose: () => void;
  setKiosks: React.Dispatch<React.SetStateAction<KioskDTO[]>>;
};
const DeleteDialog: React.FC<Props> = ({ kioskId, handleClose, setKiosks }) => {
  const displaySnackbar = React.useContext(SnackbarContext);
  const isProcessing = React.useRef(false);
  const { deleteKiosk } = useKiosks();

  const handleDelete = () => {
    isProcessing.current = true;
    deleteKiosk(kioskId)
      .then((response) => {
        displaySnackbar(response.data.message, "success");

        setKiosks((prevState) => prevState.filter((kiosk) => kiosk._id !== kioskId));

        handleClose();
      })
      .catch((error) => {
        handleClose();
        displaySnackbar(error.response.data, "error");
      });
  };

  return (
    <Dialog
      open={!!kioskId}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete kiosk"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this kiosk?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isProcessing.current} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={isProcessing.current}
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
