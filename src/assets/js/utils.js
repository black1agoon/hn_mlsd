/* global SERVER_URI */

export function getImageUrl(url) {
  return process.env.NODE_ENV === 'production' ? SERVER_URI + url : url
}

export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
  return match ? decodeURIComponent(match[3]) : null
}
