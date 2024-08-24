import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDriversQuery, useDeleteDriverMutation } from "state/api";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import AddDriverForm from "components/AddDriverForm";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";

const Drivers = () => {
  const theme = useTheme();
  const { data: driversData, isLoading, error } = useGetDriversQuery();
  const [deleteDriver] = useDeleteDriverMutation();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmOpen = (id) => {
    setSelectedDriverId(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setSelectedDriverId(null);
  };

  const handleDelete = async () => {
    await deleteDriver(selectedDriverId);
    handleConfirmClose();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDrivers = driversData?.filter((driver) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "driversLicense", headerName: "Driver's License", flex: 0.4 },
    {
      field: "birth",
      headerName: "Birth Date",
      flex: 0.4,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    { field: "largeVan", headerName: "Large Van", flex: 0.5 },
    { field: "group", headerName: "Group", flex: 0.4 },
    { field: "emerald", headerName: "EMERALD Club", flex: 0.4 },
    { field: "age", headerName: "Age", flex: 0.4 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={() => handleConfirmOpen(params.row._id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Drivers" subtitle="Managing drivers and list of drivers" />
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Add Driver
      </Button>
      <AddDriverForm open={open} handleClose={handleClose} />
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        PaperProps={{
          style: {
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.primary[600]
                : theme.palette.common.white,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.getContrastText(theme.palette.primary[600])
                : theme.palette.common.black,
          },
        }}
      >
        <DialogTitle
          style={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.getContrastText(theme.palette.primary[600])
                : theme.palette.common.black,
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.getContrastText(theme.palette.primary[600])
                  : theme.palette.common.black,
            }}
          >
            Are you sure you want to delete this driver? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmClose}
            style={{
              backgroundColor: theme.palette.secondary[600],
              color: theme.palette.getContrastText(
                theme.palette.secondary[600]
              ),
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            style={{
              backgroundColor: theme.palette.secondary[600],
              color: theme.palette.getContrastText(
                theme.palette.secondary[600]
              ),
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" justifyContent="flex-end" mb="1rem">
        <TextField
          variant="outlined"
          placeholder="Search drivers"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "300px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !driversData}
          getRowId={(row) => row._id}
          rows={filteredDrivers || []} // Use filteredDrivers for the search
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Drivers;
