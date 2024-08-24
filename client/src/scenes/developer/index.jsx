import React from "react";
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Link,
  IconButton,
} from "@mui/material";
import { Animated } from "react-animated-css";
import {
  FaPython,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaAngular,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import { DiMongodb, DiDatabase } from "react-icons/di";
import profileImage from "assets/profile.jpeg";
import kinseyImage from "assets/kinsey.png";

const expertise = [
  { name: "Python", icon: <FaPython size="3em" color="#306998" /> },
  { name: "JavaScript", icon: <FaJs size="3em" color="#f7df1e" /> },
  { name: "HTML", icon: <FaHtml5 size="3em" color="#e34f26" /> },
  { name: "CSS", icon: <FaCss3Alt size="3em" color="#1572b6" /> },
  { name: "React", icon: <FaReact size="3em" color="#61dafb" /> },
  { name: "Node.js", icon: <FaNodeJs size="3em" color="#68a063" /> },
  { name: "Angular", icon: <FaAngular size="3em" color="#dd1b16" /> },
  { name: "MongoDB", icon: <DiMongodb size="3em" color="#4DB33D" /> },
  { name: "Mathematica", icon: <DiDatabase size="3em" color="#dc143c" /> }, // Placeholder icon
];

const Developer = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Typography
        variant="h3"
        gutterBottom
        color={theme.palette.secondary[500]}
      >
        Developer
      </Typography>
      <Box display="flex" alignItems="center" gap="1.5rem" mt="2rem">
        <Animated
          animationIn="fadeInLeft"
          animationOut="fadeOut"
          isVisible={true}
        >
          <Box
            component="img"
            alt="Developer"
            src={profileImage}
            height="150px"
            width="150px"
            borderRadius="50%"
            sx={{
              objectFit: "cover",
              border: `4px solid ${theme.palette.secondary[400]}`,
            }}
          />
        </Animated>
        <Animated
          animationIn="fadeInRight"
          animationOut="fadeOut"
          isVisible={true}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Abdul Basit Tonmoy
            </Typography>
            <Typography variant="h5" color={theme.palette.secondary[300]}>
              Role: Full Stack Developer
            </Typography>
            <Typography variant="h6" color={theme.palette.secondary[300]}>
              Wabash Class of 2027
            </Typography>
            <Typography variant="h6" color={theme.palette.secondary[300]}>
              Major: Computer Science
            </Typography>
            <Typography variant="h6" color={theme.palette.secondary[300]}>
              Minor: Physics and Mathematics
            </Typography>
            <Typography mt="1rem">
              This project is developed and maintained by Abdul Basit Tonmoy. It
              includes features such as [briefly describe features].
            </Typography>
            <Box mt="1rem">
              <IconButton
                component={Link}
                href="https://github.com/abtonmoy"
                target="_blank"
              >
                <FaGithub size="1.5em" color={theme.palette.secondary[400]} />
              </IconButton>
              <IconButton
                component={Link}
                href="https://www.linkedin.com/in/abdul-basit-tonmoy"
                target="_blank"
              >
                <FaLinkedin size="1.5em" color={theme.palette.secondary[400]} />
              </IconButton>
              <IconButton component={Link} href="mailto:atonmoy27@wabash.com">
                <FaEnvelope size="1.5em" color={theme.palette.secondary[400]} />
              </IconButton>
              <IconButton
                component={Link}
                href="https://abdulbasittonmoy.com"
                target="_blank"
              >
                <FaGlobe size="1.5em" color={theme.palette.secondary[400]} />
              </IconButton>
            </Box>
          </Box>
        </Animated>
      </Box>
      <Box mt="3rem">
        <Typography
          variant="h5"
          gutterBottom
          color={theme.palette.secondary[500]}
        >
          Expertise
        </Typography>
        <Grid container spacing={3}>
          {expertise.map((skill) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={skill.name}>
              <Animated
                animationIn="bounceIn"
                animationOut="fadeOut"
                isVisible={true}
              >
                <Box textAlign="center">
                  {skill.icon}
                  <Typography variant="h6" mt="0.5rem">
                    {skill.name}
                  </Typography>
                </Box>
              </Animated>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt="3rem">
        <Typography
          variant="h3"
          gutterBottom
          color={theme.palette.secondary[500]}
        >
          Special Credits
        </Typography>
        <Box display="flex" alignItems="center" gap="1.5rem" mt="2rem">
          <Animated
            animationIn="fadeInLeft"
            animationOut="fadeOut"
            isVisible={true}
          >
            <Box
              component="img"
              alt="Special Credit"
              src={kinseyImage}
              height="150px"
              width="150px"
              borderRadius="50%"
              sx={{
                objectFit: "cover",
                border: `4px solid ${theme.palette.secondary[400]}`,
              }}
            />
          </Animated>
          <Animated
            animationIn="fadeInRight"
            animationOut="fadeOut"
            isVisible={true}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Kinsey Bays
              </Typography>
              <Typography variant="h5" color={theme.palette.secondary[300]}>
                Role: Supervisor
              </Typography>
              <Typography mt="1rem">
                Kinsey Bays contributed significantly to this project by her
                constant support and supervision.
              </Typography>
              <Box mt="1rem">
                <IconButton
                  component={Link}
                  href="https://www.linkedin.com/in/kinseybays"
                  target="_blank"
                >
                  <FaLinkedin
                    size="1.5em"
                    color={theme.palette.secondary[400]}
                  />
                </IconButton>
                <IconButton component={Link} href="mailto:baysk@wabash.edu">
                  <FaEnvelope
                    size="1.5em"
                    color={theme.palette.secondary[400]}
                  />
                </IconButton>
                <IconButton
                  component={Link}
                  href="https://kinseybays.com"
                  target="_blank"
                >
                  <FaGlobe size="1.5em" color={theme.palette.secondary[400]} />
                </IconButton>
              </Box>
            </Box>
          </Animated>
        </Box>
      </Box>
    </Box>
  );
};

export default Developer;
