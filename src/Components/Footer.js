import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import './Footer.css'

function Copyright() {
  return (
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <Link color="inherit" href="#">
          Foongrum
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
  );
}

export default function StickyFooter() {
  return (
    <footer className="sticky-footer">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 0,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body2">
              A Rocket Academy Project to learn the PERN stack.
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </footer>
  );
}
