import createGoodsList from './modules/create-goods-list.js'
import createNotificationError from './modules/create-notification-error.js'
import createError from './modules/create-error.js'
import create404ErrorContent from './modules/create-404-error-Content.js'

const loadingSpiner = document.getElementById('loading')
const container = document.getElementById('goods-container')
const errorNotificationContainer = document.getElementById('error-notification-container')
const errorContainer = document.getElementById('error')
let numberTry500Status = 0

async function createPage() {
  let response = await fetch('/api/products')

  switch (response.status) {
    case 500:
      if(numberTry500Status < 2) {
        numberTry500Status++
        createNotificationError(
          `Произошла ошибка, пробую переподключиться к серверу. Попытка: ${numberTry500Status}`,
           errorNotificationContainer)
        createPage()
        return
      }
      createError(
        'Произошла ошибка, попробуйте обновить страницу позже',
         errorContainer)

      break;

    case 404:
      create404ErrorContent(container)
    break

    case 200:
      try{
        let res = await response.json()
        createGoodsList(res, container)
      } catch(err) {
      createError(
        'Произошла ошибка, попробуйте обновить страницу позже',
          errorContainer)
      loadingSpiner.classList.add('d-none')
          throw err
      }
    break

    default:
      createError(
        'Произошла ошибка, попробуйте обновить страницу позже',
         errorContainer)
    break;
  }

  loadingSpiner.classList.add('d-none')
}

createPage()

window.addEventListener('offline', () => {
  errorContainer.innerHTML = ''
  container.innerHTML = ''
  createError(
    'Произошла ошибка, проверьте подключение к интернету',
     errorContainer) });