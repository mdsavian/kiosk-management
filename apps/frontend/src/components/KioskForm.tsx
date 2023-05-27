import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
  DialogActions,
  Button,
} from "@mui/material";
import TimePicker from "./CustomTimePicker";
import { KioskDTO } from "types";
import * as dayjs from "dayjs";
import useKiosks from "../hooks/useKiosks";
import { SnackbarContext } from "./commons/SnackBar/SnackbarProvider";

type Props = {
  kiosk?: KioskDTO;
  handleClose: () => void;
  setKiosks: React.Dispatch<React.SetStateAction<KioskDTO[]>>;
};

const KioskForm: React.FC<Props> = ({ kiosk, handleClose, setKiosks }) => {
  const displaySnackbar = React.useContext(SnackbarContext);
  const { createKiosk, updateKiosk } = useKiosks();
  const isProcessing = React.useRef(false);

  const initKiosk: KioskDTO = kiosk || {
    storeClosesAt: dayjs(new Date()).add(1, "minutes").toDate(),
    storeOpensAt: dayjs(new Date()).toDate(),
    isKioskClosed: false,
  };

  const [newKiosk, setNewKiosk] = React.useState<KioskDTO>(initKiosk);
  const isEditing = !!kiosk?._id;
  const title = isEditing ? "Edit" : "Create";

  const handleSubmit = async () => {
    if (!newKiosk) {
      return;
    }

    isProcessing.current = true;

    if (isEditing) {
      await updateKiosk(newKiosk)
        .then((response) => {
          setKiosks((prevState) =>
            prevState.map((prev) => (prev._id === newKiosk._id ? response.data.data : prev))
          );

          displaySnackbar("Kiosk updated successfully", "success");

          handleClose();
        })
        .catch((error) => {
          displaySnackbar(error.response.data, "error");
        });
    } else {
      await createKiosk(newKiosk)
        .then((response) => {
          setKiosks((prevState) => [...prevState, response.data.data]);

          displaySnackbar("Kiosk created successfully", "success");

          handleClose();
        })
        .catch((error) => {
          displaySnackbar(error.response.data, error);
        });
    }
  };

  const handleChangeKiosk = (field: Partial<KioskDTO>) => {
    setNewKiosk((prevState) => {
      return {
        ...prevState,
        ...field,
      };
    });
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>{title} Kiosk</DialogTitle>
      <DialogContent>
        <TextField
          label="Serial Key"
          value={newKiosk?.serialKey ?? ""}
          onChange={(event) => {
            handleChangeKiosk({ serialKey: event.target.value });
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={newKiosk?.description ?? ""}
          onChange={(event) => {
            handleChangeKiosk({ description: event.target.value });
          }}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={newKiosk?.isKioskClosed}
              onChange={(event) => {
                handleChangeKiosk({ isKioskClosed: event.target.checked });
              }}
            />
          }
          label="Closed"
        />

        <TimePicker
          value={dayjs(newKiosk?.storeOpensAt)}
          label="Opens At"
          onChange={(value) => {
            console.log(value);
            handleChangeKiosk({ storeOpensAt: dayjs(value).toDate() });
          }}
        />

        <TimePicker
          value={dayjs(newKiosk?.storeClosesAt)}
          label="Closes At"
          onChange={(value) => {
            handleChangeKiosk({ storeClosesAt: dayjs(value).toDate() });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isProcessing.current}>
          Cancel
        </Button>
        <Button
          disabled={isProcessing.current}
          onClick={handleSubmit}
          variant="contained"
          color="success"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KioskForm;
