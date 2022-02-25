import Topic from "../commons/Topic"
import cleanBookmarks from "./features/CleanBookmarks"
import refreshBookmarks from "./features/RefreshBookmarks"

chrome.runtime.onMessage.addListener((request) => {
  if (request.topic === Topic.CleanBookmarks) {
    cleanBookmarks()
  } else if (request.topic === Topic.RefreshBookmarks) {
    refreshBookmarks()
  }
})
