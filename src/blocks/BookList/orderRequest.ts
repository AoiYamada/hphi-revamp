import type { OrderableBook } from './types'

type OrderRequestBook = Pick<OrderableBook, 'id' | 'title' | 'isbn' | 'price'>

// Hand-rolled instead of Intl so the server render and hydration always agree.
export const formatPrice = (price: number) =>
  `HK$${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

export const totalPrice = (books: OrderRequestBook[]) =>
  books.reduce((total, book) => total + book.price, 0)

const describeBook = (book: OrderRequestBook, index: number) =>
  `${index + 1}.《${book.title}》${book.isbn ? `ISBN ${book.isbn} ` : ''}${formatPrice(book.price)}`

// The visitor fills in the recipient lines in WhatsApp before sending, so the site never
// handles personal data. See docs/adr/0001-order-requests-via-whatsapp.md.
export const buildOrderRequestMessage = (books: OrderRequestBook[], signedCopy: boolean) =>
  [
    '你好！我想訂購以下書籍：',
    ...books.map(describeBook),
    `合共：${formatPrice(totalPrice(books))}`,
    `需要作者親筆簽名：${signedCopy ? '是' : '否'}`,
    '',
    '收件人姓名：',
    '收件地址：',
  ].join('\n')

export const buildWhatsAppUrl = (whatsAppNumber: string, message: string) =>
  `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

// GA4's recommended ecommerce event, so per-book reports work without custom dimensions.
export const buildBeginCheckoutEvent = (books: OrderRequestBook[]) => ({
  currency: 'HKD',
  value: totalPrice(books),
  items: books.map((book) => ({
    item_id: book.isbn || book.id,
    item_name: book.title,
    price: book.price,
    quantity: 1,
  })),
})
