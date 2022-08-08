
export default function prepareElement(tag, classes, text = 0) {
  const el = document.createElement(tag);
  if(Array.isArray(classes)) {el.classList.add(...classes)}
  else {el.classList.add(classes)}
  if(text) {el.textContent = text}
  return el
}
