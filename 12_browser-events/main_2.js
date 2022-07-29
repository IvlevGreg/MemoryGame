const formInputs = document.querySelectorAll('.js-input')
const form = document.getElementById('form')
const names = document.querySelector('.js-names')

formInputs.forEach((input) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[a-z0-9]/gi,'')
  })

  input.addEventListener('blur', () => {
    input.value = input.value.replace(/[a-z0-9]/gi,'')

    const strClearedDoubleSymbols = input.value.split('-').filter(n => n).join('-')
                                  .split(' ').filter(n => n).join(' ')
    function formatStr(str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }
    const strFormated = formatStr(strClearedDoubleSymbols)
    input.value = strFormated
  })
})

function getFormsValues() {
  const obj = {}
  formInputs.forEach((input) => {
    obj[input.name] = input.value
  })
  return obj
}

function clearFormsValues() {
  formInputs.forEach((input) => {
    input.value = ''
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  console.log(e)
  console.log(form.values)
  const li = document.createElement('li')
  li.classList.add('name__list')
  li.textContent = getFormsValues().name + ' ' + getFormsValues().surname + ' ' + getFormsValues().lastName
  names.append(li)
  clearFormsValues()
})
