import { Noto_Serif_TC } from 'next/font/google'

// 黑體不載入網路字型，直接用各平台的系統字體（見 globals.css 的 `--font-sans`），省下約 1 MB 的下載量。

// 明體：所有標題、文章內文、頁面長文、卡片標題、引言。接到 globals.css 的 `--font-serif`。
// 只載入 500 一種字重：內文就是 500；標題、導言、粗體（600／700）由瀏覽器模擬加粗，看起來幾乎一樣。
// 不要改成多個字重或 'variable'：Google 對多字重回傳的是整套可變字型，每個分片大約是單一字重的兩倍。
// `preload: false`：中文字型是很多個 unicode-range 分片，不預載，讓瀏覽器只抓頁面用得到的分片。
export const fontSerif = Noto_Serif_TC({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-noto-serif',
})
