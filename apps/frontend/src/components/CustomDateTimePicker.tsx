import * as React from "react";
import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type Props = {
  label: string;
  value: Dayjs;
  onChange: (value: Dayjs | null) => void;
  minDateTime?: Dayjs;
};

const CustomDateTimePicker: React.FC<Props> = ({ label, value, onChange, minDateTime }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        minDateTime={minDateTime}
        sx={{ width: "100%", marginTop: "16px", marginBottom: "8px" }}
        label={label}
        defaultValue={dayjs(new Date())}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
