import React, { useEffect, useState } from "react"
import { render } from "react-dom"
import { Paper } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../commons/Theme"

function Popup(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>≈
      <Paper
        sx={{
          height: "100%",
          textAlign: "center",
          padding: 2,
        }}
      >
        <h1>
          Hello, World!
        </h1>
      </Paper>
    </ThemeProvider>
  )
}

render(<Popup />, document.getElementById("root"))
