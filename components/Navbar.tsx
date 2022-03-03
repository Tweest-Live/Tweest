import * as React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

export default function Navbar() {
  console.log('theme:', darkTheme);
  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href='/'>Tweest</Link>
            </Typography>
          </Toolbar>
        </AppBar>
    </ThemeProvider>
  );
}
