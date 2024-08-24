import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js/auto";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const theme = useTheme();
  const [yearlyData, setYearlyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [totalTripsByIndividuals, setTotalTripsByIndividuals] = useState(null);
  const [destinationDistribution, setDestinationDistribution] = useState(null);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [averageTransactionCost, setAverageTransactionCost] = useState(0);
  const [transactionsByCategory, setTransactionsByCategory] = useState(null);
  const [tripsByVehicle, setTripsByVehicle] = useState(null);
  const [totalMiles, setTotalMiles] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/general/chargebacks`
        );
        const transactions = response.data.transactions;

        // Process data for yearly transactions
        const yearly = transactions.reduce((acc, transaction) => {
          const year = new Date(transaction.StartTime).getFullYear();
          acc[year] = (acc[year] || 0) + 1;
          return acc;
        }, {});

        // Process data for monthly transactions
        const monthly = transactions.reduce((acc, transaction) => {
          const date = new Date(transaction.StartTime);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const key = `${year}-${month.toString().padStart(2, "0")}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        // Process data for daily transactions
        const daily = transactions.reduce((acc, transaction) => {
          const date = new Date(transaction.StartTime)
            .toISOString()
            .split("T")[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        // Process data for total trips booked by individuals
        const totalTrips = transactions.reduce((acc, transaction) => {
          acc[transaction.ReservedBy] = (acc[transaction.ReservedBy] || 0) + 1;
          return acc;
        }, {});

        // Process data for destination distribution
        const destinationDist = transactions.reduce((acc, transaction) => {
          acc[transaction.destination] =
            (acc[transaction.destination] || 0) + 1;
          return acc;
        }, {});

        // Process data for transactions by category
        const transactionsByCategory = transactions.reduce(
          (acc, transaction) => {
            acc[transaction.Description] =
              (acc[transaction.Description] || 0) + 1;
            return acc;
          },
          {}
        );

        // Process data for trips by vehicle
        const tripsByVehicle = transactions.reduce((acc, transaction) => {
          acc[transaction.RoomName] = (acc[transaction.RoomName] || 0) + 1;
          return acc;
        }, {});

        // Calculate total miles
        const totalMiles = transactions.reduce((acc, transaction) => {
          return acc + (transaction.milesDriven || 0);
        }, 0);

        setYearlyData(yearly);
        setMonthlyData(monthly);
        setDailyData(daily);
        setTotalTripsByIndividuals(totalTrips);
        setDestinationDistribution(destinationDist);
        setTransactionsByCategory(transactionsByCategory);
        setTripsByVehicle(tripsByVehicle);
        setTotalMiles(totalMiles);

        // Calculate total transactions and average cost
        setTotalTransactions(transactions.length);
        setAverageTransactionCost(
          transactions.reduce((acc, transaction) => acc + transaction.cost, 0) /
            transactions.length
        );
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchData();
  }, []);

  const generateChartData = (data, label) => ({
    labels: data ? Object.keys(data) : [],
    datasets: [
      {
        label,
        data: data ? Object.values(data) : [],
        backgroundColor: theme.palette.secondary[400],
      },
    ],
  });

  const generatePieChartData = (data) => {
    const totalDataPoints = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .reduce(
        (acc, [label, value], index) => {
          if (index < 10) {
            acc.labels.push(label);
            acc.data.push(value);
          } else {
            acc.data[acc.data.length - 1] += value;
          }
          return acc;
        },
        { labels: [], data: [] }
      );

    totalDataPoints.labels.push("Other");

    return {
      labels: totalDataPoints.labels,
      datasets: [
        {
          label: "Distribution",
          data: totalDataPoints.data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom>
        Welcome to your Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Trips</Typography>
              <Typography variant="h6">{totalTransactions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Average Trip Cost</Typography>
              <Typography variant="h6">
                ${averageTransactionCost.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Miles</Typography>
              <Typography variant="h6">{totalMiles}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt="2rem">
        {destinationDistribution && (
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Destination Distribution
            </Typography>
            <Box sx={{ height: "50vh" }}>
              <Pie data={generatePieChartData(destinationDistribution)} />
            </Box>
          </Grid>
        )}
        {transactionsByCategory && (
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Trips by Category
            </Typography>
            <Box sx={{ height: "50vh" }}>
              <Pie data={generatePieChartData(transactionsByCategory)} />
            </Box>
          </Grid>
        )}
      </Grid>
      {tripsByVehicle && (
        <Box mt="2rem">
          <Typography variant="h5" gutterBottom>
            Trips by Vehicles
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <Bar
              data={generateChartData(tripsByVehicle, "Trips by Vehicles")}
            />
          </Box>
        </Box>
      )}
      {yearlyData && (
        <Box mt="2rem">
          <Typography variant="h5" gutterBottom>
            Yearly Trips
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <Bar data={generateChartData(yearlyData, "Yearly Trips")} />
          </Box>
        </Box>
      )}
      {monthlyData && (
        <Box mt="2rem">
          <Typography variant="h5" gutterBottom>
            Monthly Trips
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <Bar data={generateChartData(monthlyData, "Monthly Trips")} />
          </Box>
        </Box>
      )}
      {dailyData && (
        <Box mt="2rem">
          <Typography variant="h5" gutterBottom>
            Daily Trips
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <Bar data={generateChartData(dailyData, "Daily Trips")} />
          </Box>
        </Box>
      )}
      {totalTripsByIndividuals && (
        <Box mt="2rem">
          <Typography variant="h5" gutterBottom>
            Total Trips by Individuals
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <Bar
              data={generateChartData(
                totalTripsByIndividuals,
                "Total Trips by Individuals"
              )}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
