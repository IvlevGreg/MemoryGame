import 'babel-polyfill'

import { isValidCardNumber, isValidDate, isValidCVV, isValidEmail } from './validation.js'
import IMask from 'imask'
import { el, mount } from 'redom'
const valid = require('card-validator')
// const validatorEmail = require('email-validator')

import './style/style.scss'

import logoMir from './assets/img/mir-logo.png'
import LogoVisa from './assets/img/visa-logo.png'
import logoMastercard from './assets/img/mastercard-logo.png'
import logoMaestro from './assets/img/maestro-logo.png'

const form = document.getElementById('payment-form')
const inputsAll = document.querySelectorAll('.payment-form__input')
const logoContainer = document.getElementById('logo-container')
const formBtn = document.getElementById('payment-form-btn')
const inputStatusMap = new Map()
const inputCardNumber = form.number
const inputCardDate = form.date
const inputCardCVV = form.cvv
const inputCardEmail = form.email

let maskOptionsCardNumber = {
  mask: [
    {
      mask: '0000 0000 0000 0000 00',
      startsWith: '50',
    },
    {
      mask: '0000 0000 0000 0000 00',
      startsWith: '56',
    },
    {
      mask: '0000 0000 0000 0000 00',
      startsWith: '57',
    },
    {
      mask: '0000 0000 0000 0000 00',
      startsWith: '58',
    },
    {
      mask: '0000 0000 0000 0000',
      startsWith: '',
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = dynamicMasked.value + appended

    return dynamicMasked.compiledMasks.find(function (m) {
      return number.indexOf(m.startsWith) === 0
    })
  },
}

const maskOptionsDate = {
  mask: 'MM/YY',

  blocks: {
    YY: {
      mask: '00',
    },

    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}

const maskOptionsCVV = {
  mask: '000',
}

let maskCardNumber = IMask(inputCardNumber, maskOptionsCardNumber)

IMask(inputCardDate, maskOptionsDate)
IMask(inputCardCVV, maskOptionsCVV)

inputsAll.forEach((input) => {
  addFalseInMap(input)
  input.addEventListener('input', () => {
    removeInvalidClass(input)
  })
})

inputCardNumber.addEventListener('input', () => {
  logoContainer.innerHTML = ''
  const numberValidation = valid.number(maskCardNumber.unmaskedValue)
  if (numberValidation.card) {
    addPaymentSystemIcon(numberValidation.card.type)
  }
})

inputCardNumber.addEventListener('blur', () => {
  inputValidation(isValidCardNumber(maskCardNumber.unmaskedValue), inputCardNumber)
})

inputCardDate.addEventListener('blur', () => {
  inputValidation(isValidDate(inputCardDate.value), inputCardDate)
})

inputCardCVV.addEventListener('blur', () => {
  inputValidation(isValidCVV(inputCardCVV.value), inputCardCVV)
})

inputCardEmail.addEventListener('blur', () => {
  inputValidation(isValidEmail(inputCardEmail.value), inputCardEmail)
})

inputsAll.forEach((input) => {
  input.addEventListener('input', () => {
    checkFormCompleted()
  })
})

function inputValidation(isValid, input) {
  if (isValid) {
    inputStatusMap.delete(input.name)
    checkFormCompleted()
  } else {
    addInvalidClass(input)
    addFalseInMap(input)
    formBtn.disabled = true
  }
}
function addInvalidClass(input) {
  input.classList.add('is-invalid')
}

function removeInvalidClass(input) {
  input.classList.remove('is-invalid')
}

function addPaymentSystemIcon(system) {
  const img = el('img')
  img.classList.add('payment-form__img')

  switch (system) {
    case 'mir':
      img.src = logoMir
      break

    case 'visa':
      img.src = LogoVisa
      break

    case 'mastercard':
      img.src = logoMastercard
      break

    case 'maestro':
      img.src = logoMaestro
      break
  }

  mount(logoContainer, img)
}

// new URL('./assets/img/mir-logo.png', import.meta.url)
// new URL('./assets/img/visa-logo.png', import.meta.url)
// new URL('./assets/img/mastercard-logo.png', import.meta.url)
// new URL('./assets/img/maestro-logo.png', import.meta.url)

function checkFormCompleted() {
  if (inputStatusMap.size === 0) {
    formBtn.disabled = false
  } else {
    formBtn.disabled = true
  }
}

function addFalseInMap(input) {
  inputStatusMap.set(input.name, false)
}

form.addEventListener('submit', (e) => e.preventDefault())
