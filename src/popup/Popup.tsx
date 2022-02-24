import React, { useState } from "react"
import { render } from "react-dom"
import { Paper } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../commons/Theme"
import Actions from "./pages/actions/Actions"
import Settings from "./pages/settings/Settings"

function Popup(): JSX.Element {
  const [activePage, setActivePage] = useState("actions")

  const styles = {
    height: "100%",
    padding: 2,
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={styles}>
        {activePage === "actions" &&
          <Actions setActivePage={setActivePage} />
        }

        {activePage === "settings" &&
          <Settings setActivePage={setActivePage} />
        }
      </Paper>
    </ThemeProvider>
  )
}

render(<Popup />, document.getElementById("root"))
