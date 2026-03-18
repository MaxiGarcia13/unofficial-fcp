export function useParams() {
  const searchParams = new URLSearchParams(window.location.search)

  const pushState = () => {
    const url = new URL(`${window.location.origin}?${searchParams.toString()}`)

    window.history.pushState({}, '', url)
  }

  return {
    params: searchParams,
    pushState,
  }
}
