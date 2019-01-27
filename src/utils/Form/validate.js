export const emailValidation = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email введен неверно'
    : undefined

export const required = value => (value ? undefined : 'Поле обязательно для заполнения')

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

export const minLength = min => value =>
  value && value.length < min ? `Должно быть не менее ${min} символов` : undefined
export const maxLength = max => value =>
  value && value.length > max ? `Должно быть не более ${max} символов` : undefined

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
export const maxValue = max => value =>
  value && value > max ? `Must be at least ${max}` : undefined

export const tooYoung = value =>
  value && value < 13
    ? 'You do not meet the minimum age requirement!'
    : undefined
export const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9а-яА-Я ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
