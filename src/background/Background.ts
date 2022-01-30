// import TabChangeInfo = chrome.tabs.TabChangeInfo
// import Tab = chrome.tabs.Tab

// const handleInstall = () => {
//   const welcomePageUrl = "https://samueldobbie.github.io/troogl-extension/"
//   chrome.tabs.create({ url: welcomePageUrl })
// }

// const handleUpdated = (tabId: number, changeInfo: TabChangeInfo, tab: Tab) => {
//   const tabUrl = tab.url
  
//   if (changeInfo.status === "complete" && tabUrl) {
//     const originUrl = new URL(tabUrl).hostname
    
//     chrome.storage.sync.get("autoRun", (item) => {
//       if (item.autoRun == false) return

//       chrome.storage.sync.get("disabledUrls", (item) => {
//         const disabledUrls = item.disabledUrls || []
  
//         if (disabledUrls.includes(originUrl)) return

//         chrome.tabs.sendMessage(tabId, {
//           topic: "TabUpdated",
//           payload: { url: tabUrl },
//         })
//       })
//     })

//   }
// }

// chrome.runtime.onInstalled.addListener(handleInstall)

// chrome.tabs.onUpdated.addListener(handleUpdated)
