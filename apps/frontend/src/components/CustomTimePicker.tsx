import * as React from "react";
import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";

type Props = {
  label: string;
  value: Dayjs;
  onChange: (value: Dayjs | null) => void;
  minTime?: Dayjs;
};

const CustomTimePicker: React.FC<Props> = ({ label, value, onChange, minTime }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        minTime={minTime}
        sx={{ width: "100%", marginTop: "16px", marginBottom: "8px" }}
        label={label}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
