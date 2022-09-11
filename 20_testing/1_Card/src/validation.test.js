/**
 * @jest-environment jsdom
 */
import { isValidCardNumber, isValidCVV } from './validation.js'

test('Валидация номера карты пропускает корректный номер карты', () => {
  expect(isValidCardNumber('5469380041630731')).toBe(true)
})

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы', () => {
  expect(isValidCardNumber('54693а0041630731')).toBe(false)
  expect(isValidCardNumber('54693,0041630731')).toBe(false)
  expect(isValidCardNumber('54693/0041630731')).toBe(false)
  expect(isValidCardNumber('.4693а0041630731')).toBe(false)
})

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр', () => {
  expect(isValidCardNumber('546930041630731')).toBe(false)
  expect(isValidCardNumber('54693004163073')).toBe(false)
  expect(isValidCardNumber('5469')).toBe(false)
})

test('Валидация номера карты не пропускает строку со слишком большим количеством цифр', () => {
  expect(isValidCardNumber('54693004163073121211212')).toBe(false)
  expect(isValidCardNumber('5469211212121212121212121212')).toBe(false)
})

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами', () => {
  expect(isValidCVV('123')).toBe(true)
  expect(isValidCVV('456')).toBe(true)
})

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами', () => {
  expect(isValidCVV('12')).toBe(false)
  expect(isValidCVV('45')).toBe(false)
})

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами', () => {
  expect(isValidCVV('1234')).toBe(false)
  expect(isValidCVV('4578')).toBe(false)
})

test(`Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами
  (латиница, кириллица и знаки препинания)`, () => {
  expect(isValidCVV('1,2')).toBe(false)
  expect(isValidCVV('4.5')).toBe(false)
  expect(isValidCVV('45a')).toBe(false)
  expect(isValidCVV('&45')).toBe(false)
  expect(isValidCVV('45/')).toBe(false)
})
