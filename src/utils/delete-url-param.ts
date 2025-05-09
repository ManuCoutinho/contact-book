export default function deleteUrlParam(params: string[]) {
  const url = new URL(window.location.href)
  for (const key of params) {
    url.searchParams.delete(key)
  }

  window.history.replaceState(null, '', url)
}