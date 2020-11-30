/* global SERVER_URI */

export function getImageUrl(url) {
  return process.env.NODE_ENV === 'production' ? SERVER_URI + url : url
}
