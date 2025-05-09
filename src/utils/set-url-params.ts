export default function setUrlParam(params: { key: string; value: string }[]) {
  const url = new URL(window.location.href)
  for (const { key, value } of params) {
    url.searchParams.set(key, value)
  }

  window.history.replaceState(null, '', url)
}