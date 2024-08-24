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
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCarsQuery, useDeleteCarMutation } from "state/api";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import AddCarForm from "components/AddCarForm";
import DeleteIcon from "@mui/icons-material/Delete";
const Cars = () => {
  const theme = useTheme();
  const { data: carsData, isLoading, error } = useGetCarsQuery();
  const [deleteCar] = useDeleteCarMutation();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirmOpen = (id) => {
    setSelectedCarId(id);
    setConfirmOpen(true);
  };
  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setSelectedCarId(null);
  };
  const handleDelete = async () => {
    await deleteCar(selectedCarId);
    handleConfirmClose();
  };
  const columns = [
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "code", headerName: "Code", flex: 0.4 },
    { field: "category", headerName: "Category", flex: 0.4 },
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
      <Header title="Cars" subtitle="Managing cars and list of cars" />
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Add Car
      </Button>
      <AddCarForm open={open} handleClose={handleClose} />
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
            Are you sure you want to delete this car? This action cannot be
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
          loading={isLoading || !carsData}
          getRowId={(row) => row._id}
          rows={carsData || []} // Use carsData directly
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};
export default Cars;
