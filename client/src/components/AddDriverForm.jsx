import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  useTheme,
} from "@mui/material";
import { useAddDriverMutation } from "state/api";

const AddDriverForm = ({ open, handleClose }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [formValues, setFormValues] = useState({
    name: "",
    largeVan: false,
    group: "",
    birth: "",
    driversLicense: "",
    dateAdded: "",
    dateExpiration: "",
    cellphone: "",
    emerald: "",
    age: 0,
    role: "driver",
    "21+": false,
  });

  const [addDriver] = useAddDriverMutation();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addDriver(formValues);
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
      <DialogTitle>Add New Driver</DialogTitle>
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
          name="group"
          label="Group"
          type="text"
          fullWidth
          value={formValues.group}
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
          name="birth"
          label="Birth Date"
          type="date"
          fullWidth
          value={formValues.birth}
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
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          name="driversLicense"
          label="Driver's License"
          type="text"
          fullWidth
          value={formValues.driversLicense}
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
          name="dateAdded"
          label="Date Added"
          type="date"
          fullWidth
          value={formValues.dateAdded}
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
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          name="dateExpiration"
          label="Date Expiration"
          type="date"
          fullWidth
          value={formValues.dateExpiration}
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
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          name="cellphone"
          label="Cellphone"
          type="text"
          fullWidth
          value={formValues.cellphone}
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
          name="emerald"
          label="Emerald"
          type="text"
          fullWidth
          value={formValues.emerald}
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
          name="age"
          label="Age"
          type="number"
          fullWidth
          value={formValues.age}
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
          name="role"
          label="Role"
          type="text"
          fullWidth
          value={formValues.role}
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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <label>
            <input
              type="checkbox"
              name="21+"
              checked={formValues["21+"]}
              onChange={handleInputChange}
            />
            21+
          </label>
          <label>
            <input
              type="checkbox"
              name="largeVan"
              checked={formValues.largeVan}
              onChange={handleInputChange}
            />
            Large Van
          </label>
        </Box>
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
          Add Driver
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDriverForm;
