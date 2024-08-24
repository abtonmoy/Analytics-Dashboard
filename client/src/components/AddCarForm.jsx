import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { useAddCarMutation } from "state/api";

const AddCarForm = ({ open, handleClose }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [formValues, setFormValues] = useState({
    name: "",
    code: "",
    category: "",
  });

  const [addCar] = useAddCarMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addCar(formValues);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: isDarkMode ? theme.palette.primary[600] : "",
        },
      }}
    >
      <DialogTitle>Add New Car</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formValues.name}
          onChange={handleInputChange}
          InputProps={{
            style: {
              color: isDarkMode
                ? theme.palette.getContrastText(theme.palette.primary[600])
                : "",
            },
          }}
          InputLabelProps={{
            style: {
              color: isDarkMode
                ? theme.palette.getContrastText(theme.palette.primary[600])
                : "",
            },
          }}
        />
        <TextField
          margin="dense"
          name="code"
          label="Code"
          type="text"
          fullWidth
          value={formValues.code}
          onChange={handleInputChange}
          InputProps={{
            style: {
              color: isDarkMode
                ? theme.palette.getContrastText(theme.palette.primary[600])
                : "",
            },
          }}
          InputLabelProps={{
            style: {
              color: isDarkMode
                ? theme.palette.getContrastText(theme.palette.primary[600])
                : "",
            },
          }}
        />
        <TextField
          margin="dense"
          name="category"
          label="Category"
          type="text"
          fullWidth
          value={formValues.category}
          onChange={handleInputChange}
          InputProps={{
            style: {
              color: isDarkMode
                ? theme.palette.getContrastText(theme.palette.primary[600])
                : "",
            },
          }}
          InputLabelProps={{
            style: {
              color: isDarkMode
                ? theme.palette.getContrastText(theme.palette.primary[600])
                : "",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.getContrastText(theme.palette.secondary.main),
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.getContrastText(theme.palette.secondary.main),
          }}
        >
          Add Car
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCarForm;
