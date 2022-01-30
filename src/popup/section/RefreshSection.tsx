import Description from "../components/description/Description"
import React from "react"
import ActionButton from "../components/action-button/ActionButton"
import Header from "../components/header/Header"

function RefreshSection(): JSX.Element {
  const handleRefresh = (): void => {
    chrome.runtime.sendMessage({ topic: "RefreshBookmarks" })
  }

  return (
    <>
      <Header>
        Refresh bookmarks
      </Header>

      <Description>
        Updates bookmark titles and favicons. All pages will be
        slowly opened and closed, so can take up to two minutes.
        Please don't use your browser until the refresh is complete.
      </Description>

      <ActionButton
        handleClick={handleRefresh}
        text="Run refresh (Slow)"
      />
    </>
  )
}

export default RefreshSection
