import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../state";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles"; // Import useTheme to access the theme
import logo from "../../assets/wabash.png"; // Import the logo

const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.secondary[300], // Set background color to secondary[300]
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "400px",
  width: "100%",
  backgroundColor: theme.palette.primary[600], // Set form container background to primary[600]
  color: theme.palette.getContrastText(theme.palette.primary[600]), // Ensure text color is readable
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  backgroundColor: theme.palette.secondary[400],
  "&:hover": {
    backgroundColor: theme.palette.secondary[200],
  },
}));

const Logo = styled("img")(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "200px",
  alignSelf: "center",
}));

const Login = () => {
  const theme = useTheme(); // Use the theme hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        {
          username,
          password,
        }
      );

      const { token, id } = response.data;
      localStorage.setItem("token", token);

      // Fetch user data using the ID
      const userResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/general/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(setUser(userResponse.data));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Root theme={theme}>
      <Container component="main" maxWidth="xs">
        <Typography
          component="h1"
          variant="h4"
          sx={{ marginBottom: theme.spacing(3) }}
        >
          Welcome to MOTORPOOL ANALYTICS
        </Typography>
        <FormContainer elevation={3}>
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton type="submit" fullWidth variant="contained">
              Sign In
            </SubmitButton>
          </Form>
        </FormContainer>
        <Logo
          src={logo}
          alt="Wabash College Logo"
          style={{ marginTop: theme.spacing(5), marginLeft: theme.spacing(13) }}
        />
      </Container>
    </Root>
  );
};

export default Login;
