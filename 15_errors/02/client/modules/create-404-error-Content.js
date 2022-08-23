export default function createError(container) {

  const li = document.createElement('li')

  const h2 = document.createElement('h2')
  h2.classList.add('text', 'p-5')
  h2.textContent = 'Список товаров пуст'

  li.append(h2)
  container.append(li)
  return li
}
