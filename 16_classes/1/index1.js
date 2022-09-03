const container = document.getElementById('container')
const spiner = document.getElementById('spiner')
const btnText = document.getElementById('btn-text')
const btn = document.getElementById('btn')

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}


class BaseComponent {

  constructor(obj) { 
    this.selector = obj.selector;
    this.showLoader = obj.showLoader;
    this.showErrorState = obj.showErrorState;
   }

  async fetch() {
    await wait(3000);

    // Создание ошибки
    throw new TypeError('Возникла ошибка загрузки страницы. Можно убрать на 32 строке кода index.js')
        return {}
  }

  getElement() {
    return this.selector
  }

async createElement(text){
  this.getElement().innerHTML = ''

  if(this.showLoader) {
    spiner.style.display = 'inline-block'
    btnText.textContent = 'Loading...'
    btn.disabled = true
    btn.style.display = 'inline-block'
  }

  try {
    await this.fetch()
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    h2.textContent = text

    div.append(h2)
    this.getElement().append(div)

    btn.style.opacity = 0

    return div
  } catch(err) {
      btn.disabled = false
      spiner.style.display = 'none'
      btnText.textContent = 'Попробовать еще раз'

      btn.addEventListener('click', () => {
        this.createElement(text)
      })

    if(this.showErrorState) {
      const div = document.createElement('div')
      div.textContent = err
      div.style.color = 'rgb(176, 78, 78)'
      this.getElement().append(div)
      }
    }
  }
}

const baseComponent = new BaseComponent({
  selector: container,
  showLoader: true,
  showErrorState: true
})
baseComponent.createElement('Какой-то текст').then()

export default BaseComponent