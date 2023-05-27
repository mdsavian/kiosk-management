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
  const { deleteKiosk } = useKiosks();

  const handleDelete = () => {
    deleteKiosk(kioskId)
      .then((response) => {
        // TODO customize the alert
        alert(response.data.message);

        setKiosks((prevState) => prevState.filter((kiosk) => kiosk._id !== kioskId));

        handleClose();
      })
      .catch((error) => {
        handleClose();
        // TODO customize the alert
        alert(error.response.data);
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button sx={{ color: "red" }} onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
