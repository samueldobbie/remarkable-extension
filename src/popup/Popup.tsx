import React, { useState } from "react"
import { render } from "react-dom"
import { Paper } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../commons/Theme"
import Settings from "./pages/settings/Settings"
import Home from "./pages/home/Home"
import Page from "./commons/Page"

function Popup(): JSX.Element {
  const [activePage, setActivePage] = useState(Page.Home)

  const styles = {
    height: "100%",
    padding: 2,
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={styles}>
        {activePage === Page.Home &&
          <Home setActivePage={setActivePage} />
        }

        {activePage === Page.Settings &&
          <Settings setActivePage={setActivePage} />
        }
      </Paper>
    </ThemeProvider>
  )
}

render(<Popup />, document.getElementById("root"))
