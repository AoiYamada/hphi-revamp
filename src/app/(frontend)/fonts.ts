import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google'

// 黑體：選單、按鈕、小標籤、表單、日期與作者等資訊。接到 globals.css 的 `--font-sans`。
// `preload: false`：中文字型是很多個 unicode-range 分片，不預載，讓瀏覽器只抓頁面用得到的分片。
export const fontSans = Noto_Sans_TC({
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-noto-sans',
})

// 明體：所有標題、文章內文、頁面長文、卡片標題、引言。接到 globals.css 的 `--font-serif`。
export const fontSerif = Noto_Serif_TC({
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-noto-serif',
})
