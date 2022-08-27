import BaseComponent from './BaseComponent.js'

const container = document.getElementById('container')

class AddToCartComponent extends BaseComponent {

  constructor(obj) {
    super(obj);
    this._startValue = obj.startValue
  }

  fetch() {
    return this._value = +this._startValue 
  }

  getElement() {
    this.fetch()
        if(this._value === 0){
      return this.prepareForZeroValue()
    }  else {
      return this.prepareForValues()
    }
  }

  prepareForZeroValue() {
    
      const btn = document.createElement('button')
      btn.classList.add('btn', 'btn-secondary')
      btn.textContent = 'Добавить в корзину'

      btn.addEventListener('click', () => {
        this.cartValue = 1
      })

      return btn
  }

  prepareForValues(){
    
  const div = document.createElement('div')

      const btnMinus = document.createElement('button')
      btnMinus.classList.add('btn', 'btn-secondary', 'cart-btns')
      btnMinus.textContent = '-'
      btnMinus.addEventListener('click', () => {
        if(span.textContent > 0) span.textContent= --this._value
        if(+span.textContent === 0) this.cartValue = 0
      })

      const span = document.createElement('span')
      span.textContent = this._value
      this._valueSpan = span

      const btnPlus = document.createElement('button')
      btnPlus.classList.add('btn', 'btn-secondary', 'cart-btns')
      btnPlus.textContent = '+'
      btnPlus.addEventListener('click', () => {
        span.textContent = ++this._value
        btnMinus.disabled = false
      })

      div.append(btnMinus)
      div.append(span)
      div.append(btnPlus)
      return div
}
  createElement() {
    this.selector.append(this.getElement())
  }

  get cartValue(){
    return this._value
  }

  set cartValue(value){
    this.selector.innerHTML = ''
    this._value = value
    value === 0 ? this.selector.append(this.prepareForZeroValue()) :  this.selector.append(this.prepareForValues())
  }
}

let addToCartComponent = new AddToCartComponent({
  selector: container,
  startValue: 0
})

addToCartComponent.createElement()
// addToCartComponent.cartValue = 10
//  addToCartComponent.cartValue = 5
//  addToCartComponent.cartValue = 0