export default function createError(text, errorContainer) {
  const p = document.createElement('p')
  p.classList.add('error__text')
  p.textContent = text

  errorContainer.append(p)
  return p
}
