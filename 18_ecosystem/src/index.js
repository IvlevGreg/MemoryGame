import IMask from 'imask';
import { el, mount } from "redom"
const valid = require("card-validator");
const validatorEmail = require("email-validator");

const form = document.getElementById('payment-form')
const inputsAll = document.querySelectorAll('.payment-form__input')
const logoContainer = document.getElementById('logo-container')
const formBtn = document.getElementById('payment-form-btn')
const inputStatusMap = new Map()
const inputCardNumber = form.number;
const inputCardDate = form.date;
const inputCardCVV = form.cvv;
const inputCardEmail = form.email;

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
    const number = (dynamicMasked.value + appended);

    return dynamicMasked.compiledMasks.find(function (m) {
      return number.indexOf(m.startsWith) === 0;
    })
  }
};

const maskOptionsDate = {
  mask: 'MM/YY',
  
  blocks: {
    YY: {
      mask: '00',
    },
    
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    }
  }
};

const maskOptionsCVV = {
  mask: '000'
};

let maskCardNumber = IMask(inputCardNumber, maskOptionsCardNumber);

const maskCardDate = IMask(inputCardDate, maskOptionsDate);
const maskCardCvv = IMask(inputCardCVV, maskOptionsCVV);

inputsAll.forEach(input => {
  addFalseInMap(input)
  input.addEventListener('input', () => {
    removeInvalidClass(input)
  })
});

inputCardNumber.addEventListener('input', () => {
  logoContainer.innerHTML = ''
  const numberValidation = valid.number(maskCardNumber.unmaskedValue);
  if (numberValidation.card) {
    addPaymentSystemIcon(numberValidation.card.type)
    }
})

inputCardNumber.addEventListener('blur', () => {
  const numberValidation = valid.number(maskCardNumber.unmaskedValue);
  inputValidation(numberValidation, inputCardNumber)
})

inputCardDate.addEventListener('blur', () => {
  const dateValidation = valid.expirationDate(inputCardDate.value);
  inputValidation(dateValidation, inputCardDate)
})

inputCardCVV.addEventListener('blur', () => {
  const cvvValidation = valid.cvv(inputCardCVV.value);
  inputValidation(cvvValidation, inputCardCVV)
})

inputCardEmail.addEventListener('blur', () => {
  if(!validatorEmail.validate(inputCardEmail.value)) {
    addInvalidClass(inputCardEmail)} else {
      inputStatusMap.delete(inputCardEmail.name)
      checkFormCompleted()
    }
})

inputsAll.forEach(input => {
  input.addEventListener('input', () => {
    checkFormCompleted()
  })
});

function inputValidation(validation, input) {
  if (!validation.isValid) {
    addInvalidClass(input)
    addFalseInMap(input)
    formBtn.disabled = true
    } else {
      inputStatusMap.delete(input.name)
      checkFormCompleted()
    }
}
function addInvalidClass(input) {
  input.classList.add('is-invalid')
}

function removeInvalidClass(input) {
  input.classList.remove('is-invalid')
}

function addPaymentSystemIcon(system) {
  
  const img = el('img');
  img.classList.add('payment-form__img')
  
switch (system) {
  
  case 'mir':
    img.src = new URL('img/mir-logo.png', import.meta.url)
    break;

    case 'visa':
    img.src = new URL('img/visa-logo.png', import.meta.url)
    break;

    case 'mastercard':
    img.src = new URL('img/mastercard-logo.png', import.meta.url)
    break;

    case 'maestro':
    img.src = new URL('img/maestro-logo.png', import.meta.url)
    break;
  }
  mount(logoContainer, img);
}

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