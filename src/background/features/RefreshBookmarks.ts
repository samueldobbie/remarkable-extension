import BatchSize from "../../commons/BatchSize"
import getValidBookmarks from "../commons/GetValidBookmarks"
import IBookmark from "../commons/IBookmark"

const refreshBookmarks = () => {
  chrome.storage.sync.get(BatchSize.StorageKey, (stored) =>{
    const batchSize = stored[BatchSize.StorageKey] || BatchSize.Default

    chrome.bookmarks.search({}, async (bookmarks) => {
      const validBookmarks = getValidBookmarks(bookmarks)
      const batchedBookmarks = getBatchedBookmarks(validBookmarks, batchSize)

      for (const batch of batchedBookmarks) {
        await refreshBatch(batch)
      }

      // const interval = setInterval(() => {
      //   if (batchedBookmarks.length === 0) {
      //     clearInterval(interval)
      //     return
      //   }
  
      //   const batch = batchedBookmarks.shift()
  
      //   if (batch) {
      //     refreshBatch(batch, batchDuration)
      //   }
      // }, batchDuration)
    })
  })
}

const getBatchedBookmarks = (bookmarks: IBookmark[], batchSize: number) => {
  const batches = [] as IBookmark[][]

  for (let i = 0; i < bookmarks.length; i += batchSize) {
    const batch = bookmarks.slice(i, i + batchSize)
    batches.push(batch)
  }

  return batches
}

const refreshBatch = (batch: IBookmark[]) => {
  const promises = []

  for (const bookmark of batch) {
    promises.push(handleBookmark(bookmark.url))
  }

  return Promise.all(promises)
}

const handleBookmark = (url: string) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.create({ url }, (tab) => {
      const tabId = tab.id

      if (tabId) {
        chrome.tabs.onUpdated.addListener((updatedTabId, changeInfo) => {
          let totalTime = 0

          const interval = setInterval(() => {
            const isSameTab = updatedTabId === tabId
            const isReady = changeInfo.status === "complete"

            if (isSameTab && isReady) {
              chrome.tabs.remove(tabId)
              clearInterval(interval)
              resolve("success")
            }

            totalTime += 500

            if (totalTime > 10000) {
              chrome.tabs.remove(tabId)
              clearInterval(interval)
              reject("timeout")
            }
          }, 500)
        })
      }
    })
  })
}

export default refreshBookmarks
