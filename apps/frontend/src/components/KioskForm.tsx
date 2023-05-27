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

type Props = {
  kiosk?: KioskDTO;
  handleClose: () => void;
  setKiosks: React.Dispatch<React.SetStateAction<KioskDTO[]>>;
};

const KioskForm: React.FC<Props> = ({ kiosk, handleClose, setKiosks }) => {
  const { createKiosk, updateKiosk } = useKiosks();

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

    if (isEditing) {
      await updateKiosk(newKiosk)
        .then((response) => {
          setKiosks((prevState) =>
            prevState.map((prev) => (prev._id === newKiosk._id ? response.data.data : prev))
          );

          // TODO customize the alert
          alert("Kiosk updated successfully");
          handleClose();
        })
        .catch((error) => {
          // TODO customize the alert
          alert(error.response.data);
        });
    } else {
      await createKiosk(newKiosk)
        .then((response) => {
          setKiosks((prevState) => [...prevState, response.data.data]);

          // TODO customize the alert
          alert("Kiosk created successfully");
          handleClose();
        })
        .catch((error) => {
          // TODO customize the alert
          alert(error.response.data);
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={!newKiosk} onClick={handleSubmit} variant="contained" color="success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KioskForm;
