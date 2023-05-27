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
  open: boolean;
  handleCancel: () => void;
  setKiosks: React.Dispatch<React.SetStateAction<KioskDTO[]>>;
};

const KioskForm: React.FC<Props> = ({ kiosk, open, handleCancel, setKiosks }) => {
  const { createKiosk } = useKiosks();

  const initKiosk: KioskDTO = kiosk || {
    storeClosesAt: dayjs(new Date()).add(1, "minutes").toDate(),
    storeOpensAt: dayjs(new Date()).toDate(),
  };

  const [newKiosk, setNewKiosk] = React.useState<KioskDTO | undefined>(initKiosk);
  const isEditing = !!kiosk?._id;
  const title = isEditing ? "Edit" : "Create";

  const handleCreateKiosk = async () => {
    if (!newKiosk) {
      return;
    }

    await createKiosk(newKiosk)
      .then((response) => {
        setKiosks((prevState) => [...prevState, response.data.data]);

        // TODO customize the alert
        alert("Kiosk created successfully");
        closeDialog();
      })
      .catch((error) => {
        // TODO customize the alert
        alert(error.response.data);
      });
  };

  const handleChangeKiosk = (field: Partial<KioskDTO>) => {
    setNewKiosk((prevState) => {
      return {
        ...prevState,
        ...field,
      };
    });
  };

  const closeDialog = () => {
    setNewKiosk(undefined);
    handleCancel();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
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
              checked={newKiosk?.isKioskClosed ?? false}
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
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          disabled={!newKiosk}
          onClick={handleCreateKiosk}
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
