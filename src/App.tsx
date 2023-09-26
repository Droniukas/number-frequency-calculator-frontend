import React from "react";
import Main from "./components/main/Main";
import { ThemeProvider } from "@mui/material";
import theme from "./config/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
