const getValidBookmarks = (bookmarks: chrome.bookmarks.BookmarkTreeNode[]) => {
  const validBookmarks = [] as { id: string; url: string }[]

  bookmarks.forEach((bookmark) => {
    const { id, url } = bookmark

    if (url) {
      validBookmarks.push({ id, url })
    }
  })

  return validBookmarks
}

export default getValidBookmarks
