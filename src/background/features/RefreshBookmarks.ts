import BatchSize from "../../commons/BatchSize"
import getValidBookmarks from "../commons/GetValidBookmarks"
import Topic from "../../commons/Topic"
import Bookmark from "../commons/Bookmark"

const refreshBookmarks = () => {
  chrome.storage.sync.get(BatchSize.StorageKey, (stored) => {
    const batchSize = stored[BatchSize.StorageKey] || BatchSize.Default

    chrome.bookmarks.search({}, async (bookmarks) => {
      const validBookmarks = getValidBookmarks(bookmarks)
      const batchedBookmarks = getBatchedBookmarks(validBookmarks, batchSize)

      for (const batch of batchedBookmarks) {
        const promises = []

        for (const bookmark of batch) {
          promises.push(refreshBookmark(bookmark.url))
        }

        await Promise.all(promises)
      }

      chrome.runtime.sendMessage({
        topic: Topic.CompletedRefresh,
      })
    })
  })
}

const getBatchedBookmarks = (bookmarks: Bookmark[], batchSize: number) => {
  const batches = [] as Bookmark[][]

  for (let i = 0; i < bookmarks.length; i += batchSize) {
    const batch = bookmarks.slice(i, i + batchSize)
    batches.push(batch)
  }

  return batches
}

const refreshBookmark = (url: string) => {
  return new Promise((resolve) => {
    chrome.tabs.create({ url, active: false }, (createdTab) => {
      chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
        if (tabId == createdTab.id && changeInfo.status == "complete") {
          setTimeout(() => {
            chrome.tabs.remove(tabId, () => {
              resolve(this)
            })
          }, 1000)
        }
      })
    })
  })
}

export default refreshBookmarks
