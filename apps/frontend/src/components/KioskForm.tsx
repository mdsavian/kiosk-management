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
import CustomDateTimePicker from "./CustomDateTimePicker";
import { KioskDTO } from "types";
import * as dayjs from "dayjs";

type Props = {
  kiosk?: KioskDTO;
  open: boolean;
  handleCancel: () => void;
};

const KioskForm: React.FC<Props> = ({ kiosk, open, handleCancel }) => {
  const [newKiosk, setNewKiosk] = React.useState<KioskDTO | undefined>(kiosk);
  const title = kiosk?._id ? "Edit" : "Create";

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

        <CustomDateTimePicker
          value={dayjs(newKiosk?.storeOpensAt ?? new Date())}
          label="Opens At"
          onChange={(value) => {
            handleChangeKiosk({ storeOpensAt: dayjs(value).toDate() });
          }}
        />

        <CustomDateTimePicker
          minDateTime={dayjs(new Date())}
          value={dayjs(newKiosk?.storeClosesAt ?? new Date())}
          label="Closes At"
          onChange={(value) => {
            handleChangeKiosk({ storeClosesAt: dayjs(value).toDate() });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={() => {}} variant="contained" color="success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KioskForm;
