import * as React from "react";
import { FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

export default function MySelectField(props) {
  const [age, setAge] = React.useState("");
  const { label, name, control, width, options } = props;

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ width: { width } }}>
      <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <FormControl variant="standard">
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={value}
              onChange={onChange}
              error={!!error}
            >
              {options.map((option) => (
                <MenuItem value={option.id}>{option.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {error?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
    </FormControl>
  );
}
