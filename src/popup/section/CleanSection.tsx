import React from "react"
import ActionButton from "../components/action-button/ActionButton"
import Description from "../components/description/Description"
import Header from "../components/header/Header"

function CleanBookmarkSection(): JSX.Element {
  const handleClean = (): void => {
    chrome.runtime.sendMessage({ topic: "CleanBookmarks" })
  }

  return (
    <>
      <Header>
        Clean bookmarks
      </Header>

      <Description>
        Moves dead bookmarks (e.g. non-existent pages) to a folder called
        "Trash" for you to review. No bookmarks will be deleted.
      </Description>

      <ActionButton
        handleClick={handleClean}
        text="Run clean (Instant)"
      />
    </>
  )
}

export default CleanBookmarkSection
