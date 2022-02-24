const getValidBookmarks = (bookmarks: chrome.bookmarks.BookmarkTreeNode[]) => {
  const validBookmarks = [] as { id: string; url: string }[]

  bookmarks.forEach((bookmark) => {
    const { id, url } = bookmark

    if (url && !isSpecialUrl(url)) {
      validBookmarks.push({ id, url })
    }
  })

  return validBookmarks
}

const isSpecialUrl = (url: string): boolean => {
  const isNonHttpUrl =
    url.includes(":") &&
    !url.includes("http")

  const isLocalHostUrl =
    url.includes("://localhost")

  return isNonHttpUrl || isLocalHostUrl
}

export default getValidBookmarks
