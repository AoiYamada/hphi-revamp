import type { TextFieldSingleValidation } from 'payload'

const normalize = (isbn: string) => isbn.replace(/[\s-]/g, '').toUpperCase()

const isValidIsbn10 = (digits: string) => {
  if (!/^\d{9}[\dX]$/.test(digits)) return false

  const sum = [...digits].reduce(
    (total, char, index) => total + (char === 'X' ? 10 : Number(char)) * (10 - index),
    0,
  )
  return sum % 11 === 0
}

const isValidIsbn13 = (digits: string) => {
  if (!/^\d{13}$/.test(digits)) return false

  const sum = [...digits].reduce(
    (total, char, index) => total + Number(char) * (index % 2 === 0 ? 1 : 3),
    0,
  )
  return sum % 10 === 0
}

export const isValidIsbn = (isbn: string) => {
  const digits = normalize(isbn)
  return isValidIsbn10(digits) || isValidIsbn13(digits)
}

// ISBN is optional (some titles are self-published), but a typo in one that is entered would
// end up in every Order Request, so verify the checksum.
export const validateIsbn: TextFieldSingleValidation = (value) => {
  if (!value?.trim()) return true

  return isValidIsbn(value) || 'Not a valid ISBN-10 or ISBN-13. Check for a typo.'
}
