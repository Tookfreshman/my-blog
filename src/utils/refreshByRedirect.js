export default function redirect() {
  const { pathname, search } = window.location
  const path = pathname + search
  window.location.href = '/middlePage?path=' + path
}
