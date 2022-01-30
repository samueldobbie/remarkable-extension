import React from "react"
import { render } from "react-dom"
import { Divider, Paper } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../commons/Theme"
import CleanSection from "./section/CleanSection"
import RefreshSection from "./section/RefreshSection"

function Popup(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          height: "100%",
          padding: 2,
        }}
      >
        <CleanSection />
        <Divider sx={{ margin: 2 }} />
        <RefreshSection />
      </Paper>
    </ThemeProvider>
  )
}

render(<Popup />, document.getElementById("root"))
