import Description from "../../components/description/Description"
import React, { useState } from "react"
import ActionButton from "../../components/action-button/ActionButton"
import Header from "../../components/header/Header"
import Topic from "../../../commons/Topic"

function RefreshSection(): JSX.Element {
  const [actionText, setActionText] = useState("Run refresh (Slow)")

  const handleRefresh = (): void => {
    setActionText("Refreshing...")

    chrome.runtime.sendMessage({
      topic: Topic.RefreshBookmarks,
    })
  }

  return (
    <>
      <Header>
        Refresh bookmarks
      </Header>

      <Description>
        Updates bookmark titles and favicons. All pages will be
        slowly opened and closed, which can take a few minutes.
        Please don't use your browser until the refresh is complete.
      </Description>

      <ActionButton
        handleClick={handleRefresh}
        text={actionText}
      />
    </>
  )
}

export default RefreshSection
