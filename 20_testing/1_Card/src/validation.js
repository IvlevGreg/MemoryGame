const valid = require('card-validator')
const validatorEmail = require('email-validator')

export function isValidCardNumber(number) {
  return valid.number(number).isValid
}

export function isValidDate(date) {
  return valid.expirationDate(date).isValid
}

export function isValidCVV(cvv) {
  return valid.cvv(cvv).isValid
}

export function isValidEmail(email) {
  return validatorEmail.validate(email)
}
