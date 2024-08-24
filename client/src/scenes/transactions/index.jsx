import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
} from "@mui/material";
import { AutoSizer, Column, Table } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/Header"; // Ensure the correct path

const Transactions = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    account: "",
    ReservedBy: "",
    Description: "",
    destination: "",
    Event_ID: "",
    StartTime: "",
    EndTime: "",
    driver: "",
    milesDriven: "",
    cost: "",
  });

  useEffect(() => {
    const fetchChargebacks = async () => {
      setIsLoading(true);
      console.log("Fetching data...");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/general/chargebacks`
        );
        console.log("Data fetched:", response.data);
        setData(response.data.transactions);
        setFilteredData(response.data.transactions);
      } catch (error) {
        console.error("Error fetching chargebacks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChargebacks();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setFilteredData(data);
    } else {
      const query = e.target.value.toLowerCase();
      const filtered = data.filter((transaction) =>
        Object.values(transaction).some((value) =>
          String(value).toLowerCase().includes(query)
        )
      );
      setFilteredData(filtered);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/general/chargebacks`,
        newTransaction
      );
      setOpen(false);
      setNewTransaction({
        account: "",
        ReservedBy: "",
        Description: "",
        destination: "",
        Event_ID: "",
        StartTime: "",
        EndTime: "",
        driver: "",
        milesDriven: "",
        cost: "",
      });
      // Refresh data
      const fetchChargebacks = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/general/chargebacks`
          );
          setData(response.data.transactions);
          setFilteredData(response.data.transactions);
        } catch (error) {
          console.error("Error fetching chargebacks:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchChargebacks();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Trips"
        subtitle="Managing trips and list of all the past trips"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        style={{ marginBottom: "1rem" }}
      >
        Add New
      </Button>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        sx={{ float: "right", marginBottom: "1rem" }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Account"
            name="account"
            fullWidth
            value={newTransaction.account}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Reserved By"
            name="ReservedBy"
            fullWidth
            value={newTransaction.ReservedBy}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="Description"
            fullWidth
            value={newTransaction.Description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Destination"
            name="destination"
            fullWidth
            value={newTransaction.destination}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Event ID"
            name="Event_ID"
            fullWidth
            value={newTransaction.Event_ID}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Start Time"
            name="StartTime"
            type="datetime-local"
            fullWidth
            value={newTransaction.StartTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="End Time"
            name="EndTime"
            type="datetime-local"
            fullWidth
            value={newTransaction.EndTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Driver"
            name="driver"
            fullWidth
            value={newTransaction.driver}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Miles Driven"
            name="milesDriven"
            type="number"
            fullWidth
            value={newTransaction.milesDriven}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Cost"
            name="cost"
            type="number"
            fullWidth
            value={newTransaction.cost}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Paper
        sx={{
          backgroundColor: isDarkMode
            ? theme.palette.primary[700]
            : theme.palette.background.default,
          padding: theme.spacing(2),
          marginTop: theme.spacing(2),
        }}
      >
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                width={width}
                height={700} // Adjust height as needed
                headerHeight={40}
                rowHeight={30}
                rowCount={filteredData.length}
                rowGetter={({ index }) => filteredData[index]}
                headerClassName="table-header"
                rowClassName="table-row"
              >
                <Column label="Account" dataKey="account" width={150} />
                <Column label="Reserved By" dataKey="ReservedBy" width={150} />
                <Column label="Description" dataKey="Description" width={200} />
                <Column label="Destination" dataKey="destination" width={150} />
                <Column label="Event ID" dataKey="Event_ID" width={150} />
                <Column
                  label="Start Time"
                  dataKey="StartTime"
                  width={200}
                  cellRenderer={({ cellData }) =>
                    moment(cellData).format("YYYY-MM-DD HH:mm:ss")
                  }
                />
                <Column
                  label="End Time"
                  dataKey="EndTime"
                  width={200}
                  cellRenderer={({ cellData }) =>
                    moment(cellData).format("YYYY-MM-DD HH:mm:ss")
                  }
                />
                <Column label="Driver" dataKey="driver" width={150} />
                <Column
                  label="Miles Driven"
                  dataKey="milesDriven"
                  width={150}
                />
                <Column label="Cost" dataKey="cost" width={150} />
              </Table>
            )}
          </AutoSizer>
        )}
      </Paper>
    </Box>
  );
};

export default Transactions;
