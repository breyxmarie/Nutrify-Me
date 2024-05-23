import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

export default function MyDatePicker(props) {
  const { label, onChange, name, control, width } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <DatePicker
            onChange={onChange}
            value={value}
            sx={{ width: { width } }}
            label={label}
            slotProps={{
              textField: { error: !!error, helperText: error?.message },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
