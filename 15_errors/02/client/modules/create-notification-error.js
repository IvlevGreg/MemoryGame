export default function createNotificationError(text, errorContainer) {
  const li = document.createElement('li')
  li.classList.add('error-notification')
  const img = document.createElement('img')
  img.classList.add('error-notification__img')
  img.src = 'message.png'

  const span = document.createElement('span')
  span.classList.add('error-notification__text')
  span.textContent = text

  li.append(img)
  li.append(span)
  errorContainer.append(li)
  setTimeout( () => li.remove(), 3000)
  return li
}
