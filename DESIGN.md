# HPHI 設計規範（書卷風格）

本文件說明網站目前的視覺設計：顏色、字體、圓角、陰影，以及各類元件該怎麼用。

> **token 的唯一來源是 `src/app/(frontend)/globals.css`。** 這裡列的數值是抄過去的，如果和 `globals.css` 不一樣，以 `globals.css` 為準，並且請更新本文件。

## 1. 總覽

- **風格**：書卷風格。米白紙色底、明體標題與內文、細線、小圓角、平時不用陰影。
- **只做淺色**：沒有深色模式。`globals.css` 的 `:root` 寫了 `color-scheme: only light`，`layout.tsx` 也有同樣內容的 `<meta name="color-scheme">`，所以手機或瀏覽器的「自動深色」不會把網站轉成深色。整站不要寫任何 `dark:` class。
- **紫色的用法**：品牌紫只用在小地方（小標籤、目錄高亮、連結底線、focus、公告列）。大面積的深紫（anchor）只用在主要按鈕、CTA 色帶和 footer。不要把淺紫當成背景或邊框。
- **只用 token**：元件只能用 `globals.css` 定義的 token（例如 `bg-paper`、`text-ink`、`border-line`）。不要寫 `bg-gray-300`、`text-white`、`bg-black` 這類原始色。唯一例外是 WhatsApp 按鈕的品牌綠。

## 2. 顏色 token

Tailwind 的用法是 `bg-<名稱>`、`text-<名稱>`、`border-<名稱>`，例如 `bg-paper`、`text-ink-faint`、`border-line`。

### 2.1 調色盤

| 名稱 | token | 值 | 用途 |
|---|---|---|---|
| paper | `--color-paper` | `#f7f4ee` | 頁面底色（`body` 背景） |
| paper-raised | `--color-paper-raised` | `#fbf9f5` | 卡片、輸入框、彈出層的背景（浮起的面） |
| paper-sunken | `--color-paper-sunken` | `#efe9df` | 次要區塊底色、hover 底色（下沉的面） |
| ink | `--color-ink` | `#2b2622` | 主要文字：內文、標題 |
| ink-soft | `--color-ink-soft` | `#4a423b` | 副標題、hero 說明文字 |
| ink-faint | `--color-ink-faint` | `#706760` | 輔助文字：日期、作者、圖說、placeholder（在紙色上對比 5.04:1，在 paper-sunken 上 4.58:1，小字都 ≥ 4.5:1） |
| line | `--color-line` | `#e2dbd0` | 邊框、分隔線、表格線 |
| line-strong | `--color-line-strong` | `#d9d1c6` | Banner 上下線、卡片 hover 邊框 |
| iris | `--color-iris` | `#6241a0` | 品牌紫：小標籤、目錄高亮、連結底線、focus、公告列 |
| iris-soft | `--color-iris-soft` | `#7f5cb3` | 淡一階的品牌紫：H2 編號（在紙色上對比 4.68:1，13px 的編號也 ≥ 4.5:1） |
| lilac | `--color-lilac` | `#b9aacd` | 裝飾紫：分隔線菱形、標題下的細線 |
| anchor | `--color-anchor` | `#3d2b5f` | 深紫：主要按鈕、CTA 色帶、footer、文章導言文字 |
| success | `--color-success` | `#5a8a64` | 成功（sage）：色塊、線條 |
| warning | `--color-warning` | `#c08a2b` | 警告（amber）：色塊、線條 |
| error | `--color-error` | `#b8413f` | 錯誤（madder）：表單錯誤、Banner、危險按鈕 |
| success-text | `--color-success-text` | `#44704e` | 成功色的文字版，給小字用（在紙色上對比 ≥ 4.5:1） |
| warning-text | `--color-warning-text` | `#8f6410` | 警告色的文字版，給小字用（在紙色上對比 ≥ 4.5:1） |
| green-500 | `--color-green-500` | `#22c55e` | 只給 WhatsApp 按鈕用（品牌綠，釘回 v3 的值） |

**文字版狀態色**：`success`、`warning` 的本色深淺適合色塊和線條，拿來當小字對比不夠。小字（例如 Banner 的標籤）請用 `success-text`、`warning-text`。`error` 本身對比足夠，可以直接當文字用。

### 2.2 語意 token（shadcn 元件用，指向上面的調色盤）

| 名稱 | 指向 | 用途 |
|---|---|---|
| background | paper | 頁面背景 |
| foreground | ink | 預設文字 |
| card、popover | paper-raised | 卡片、彈出層背景 |
| card-foreground、popover-foreground | ink | 卡片、彈出層上的文字 |
| primary | anchor | 主要按鈕底色 |
| primary-foreground | paper | 主要按鈕上的文字 |
| secondary、muted、accent | paper-sunken | 次要、靜音、強調面的底色（只當底色，不要當文字色） |
| secondary-foreground、accent-foreground | ink | 上面那幾種底色上的文字 |
| muted-foreground | ink-faint | 輔助文字 |
| destructive | error | 危險按鈕底色 |
| destructive-foreground | paper | 危險按鈕上的文字 |
| border、input | line | 預設邊框、輸入框邊框 |
| ring | iris | focus 外圈顏色 |

### 2.3 chrome token（保留原版外觀）

社交條、公告列、選單（含下拉選單與手機選單）、footer 使用 `chrome-*` token。這些值是原版網站實際看到的顏色，**刻意和調色盤分開**，所以調色盤再怎麼改，頂部和 footer 的樣子都不會跟著變。除非真的要改原版的外觀，否則不要動這一段。

| 名稱 | token | 值 | 用途 |
|---|---|---|---|
| strip | `--color-chrome-strip` | `#eae4f0` | 社交條底色 |
| strip-border | `--color-chrome-strip-border` | `#e3dde9` | 社交條下緣的細線 |
| header | `--color-chrome-header` | `#f8f6ff` | 選單列底色（用 `bg-chrome-header/80` 加模糊） |
| header-border | `--color-chrome-header-border` | `#f0ecf3` | 選單列下緣的線 |
| popover | `--color-chrome-popover` | `#faf9fb` | 桌面下拉選單底色 |
| popover-border | `--color-chrome-popover-border` | `#e3dde9` | 桌面下拉選單外框 |
| panel | `--color-chrome-panel` | 同 popover | 手機選單面板底色 |
| text | `--color-chrome-text` | `#322b3b` | chrome 內的文字 |
| text-muted | `--color-chrome-text-muted` | `#6c6478` | chrome 內的次要文字 |
| qr | `--color-chrome-qr` | `#ffffff` | 社交條 QR 碼的白色外框 |
| announcement | `--color-chrome-announcement` | `#62419f` | 公告列底色 |
| announcement-foreground | `--color-chrome-announcement-foreground` | `#faf9fb` | 公告列上的文字 |
| nav | `--color-chrome-nav` | `#8766b7` | 選單連結 |
| nav-active | `--color-chrome-nav-active` | `#8766b7` | 選單連結「目前所在頁」（目前與 nav 相同） |
| footer | `--color-chrome-footer` | `#3d2b5f` | footer 底色 |
| footer-foreground | `--color-chrome-footer-foreground` | `#faf9fb` | footer 上的文字 |
| footer-line | `--color-chrome-footer-line` | `#584975` | footer 內的分隔線 |

`chrome-qr` 是整套 token 裡**唯一的純白**（QR 碼本身是純白底，外框要一樣白，掃描才清楚）。其他地方一律不用 `#fff`。

## 3. 字體

字體在 `src/app/(frontend)/fonts.ts` 用 `next/font/google` 載入，`globals.css` 的「四、字體」段落決定每個用途用哪一個字型。

| 分工 | 字型 | 字重 | 用在哪裡 |
|---|---|---|---|
| 明體（serif） | Noto Serif TC | 500（600／700 由瀏覽器模擬加粗） | 所有標題（H1–H4）、文章內文、頁面長文（prose）、卡片標題、引言 |
| 黑體（sans） | 系統字體（蘋方／微軟正黑體／Android 內建 Noto Sans CJK） | 400、500、700 | 選單、按鈕、小標籤、表單、日期與作者等資訊、卡片摘要、表格、目錄、Banner 標籤 |
| 等寬（mono） | 系統 `ui-monospace` | — | 只用在 Code 區塊 |

- 預設字體是黑體（`body`）。標題在 `globals.css` 的 base 層自動套用明體；黑體的標題（例如 footer 的欄位標題）要自己加 `font-sans`。
- fallback 順序：黑體沒有網路字型，依序是 `PingFang TC`（蘋方）、`Microsoft JhengHei`（微軟正黑體）、`Noto Sans TC`／`Noto Sans CJK TC`（有安裝 Noto 的電腦），最後是 `sans-serif`（Android 會落到內建的 Noto Sans CJK）；明體依序是 `Songti TC`、`PMingLiU`。
- `fonts.ts` 的 `preload: false`、`display: 'swap'`：中文字型切成很多片段，不預先載入，讓瀏覽器只抓頁面用得到的部分。
- 明體只載入一個字重 500（`weight: '500'`）：內文就是 500；標題、導言、引言、粗體（600／700）由瀏覽器模擬加粗，看起來幾乎一樣。不要改成多個字重或 `'variable'`：Google 對多個字重回傳的是整套可變字型，每個分片大約是單一字重的兩倍。
- 實測省下的下載量：首頁字型從約 2.8 MB 降到約 0.93 MB；長文從約 3.0 MB 降到約 1.0 MB。黑體不載入網路字型，省下的就是上面那部分。
- 設計上用到的字重：黑體 400、500、700（系統字體）；明體 500，600、700 由瀏覽器模擬。CSS 裡寫 600、700 的地方不用改，會自動模擬加粗。
- 移除了 Geist 字體，不要再用 `font-geist-*`。

## 4. 圓角

整站只有以下幾種圓角。**不要寫裸的 `rounded`**，也不要寫下表以外的尺寸（例如 `rounded-md`、`rounded-xl`）。

| class | 大小 | 用在哪裡 |
|---|---|---|
| `rounded-none` | 0 | 不需要圓角的地方（例如全寬色帶） |
| `rounded-xs` | 2px | 細部元素 |
| `rounded-sm` | 4px（預設） | 按鈕、輸入框、卡片、圖片、Code 區塊 |
| `rounded-lg` | 8px | 彈出視窗、下拉選單 |
| `rounded-full` | 圓形 | 膠囊標籤、頭像、圓形圖示按鈕 |

方向變體可以用（例如 `rounded-t-sm`、`rounded-e-sm`），但圓角值仍然只能是上面的幾種。

## 5. 陰影

只有兩種，其他一律不用。

| class | 用在哪裡 |
|---|---|
| `shadow-float` | 浮在頁面上的東西：下拉選單、彈出視窗、手機目錄展開的面板 |
| `shadow-focus` | focus 外圈：3px、品牌紫 25%（再搭配 1px 的品牌紫邊框） |
| `shadow-focus-inverse` | 深色底（公告列、footer）上的 focus 外圈：品牌紫在深色底上看不見，改用紙色 70% |

- **平時一律不用陰影**：卡片、按鈕、輸入框、整塊區域都是平的，靠底色和細線分層。
- 不要在按鈕和輸入框上加陰影。

## 6. 元件規則

### 6.1 按鈕

- 三種樣式：
  - **主要按鈕**：`bg-primary`（anchor 深紫）、`text-primary-foreground`（紙色）。
  - **次要按鈕**：紙色底或透明底、ink 色文字、1px `border-ink` 外框。
  - **文字按鈕**：沒有底色和外框，文字用 ink 或 iris。
- 高度 44px、圓角 `rounded-sm`。
- hover 只換底色或文字色，不要放大、不要位移、不要加陰影。
- 一個區塊裡最多一個主要按鈕（CTA 的第二個按鈕用白色外框，見 6.4）。

### 6.2 輸入框與表單

- 高 44px、`rounded-sm`、1px `border-line`、底色 `bg-paper-raised`、文字 ink、placeholder 用 `ink-faint`。
- focus：1px `border-iris` 加 `shadow-focus`。要隱藏瀏覽器預設的 outline 時，用 `outline-hidden`（Tailwind）或 CSS 的 `outline: 2px solid transparent; outline-offset: 2px`，不要用 `outline: none`：Windows 強制色彩模式只會畫透明的 outline，`none` 會讓 focus 完全消失。
- 下拉選單（Select）：被選到（鍵盤或滑鼠停留）的選項是 `bg-iris/10` 底色加 ink 文字；已選的項目右側有勾號。
- 錯誤：`border-error` 加錯誤說明文字（`text-error`）。
- 停用：底色 `paper-sunken`，文字 `ink-faint`。
- checkbox、radio 使用 iris。
- 適用於：表單（Form）、預約時段（TimeSlot）、書單（BookList）、CEF 計算器、搜尋框。

### 6.3 卡片（課程、文章、搜尋結果、相關文章）

- 底色 `bg-paper-raised`、1px `border-line`、`rounded-sm`、沒有陰影。
- 圖片比例 4:3。
- 內容：有分類才顯示分類小標籤（黑體 12px、iris、字距加寬）→ 明體 700 約 19px 的標題 → 黑體 14px 的摘要（最多 3 行）→ 底部一行加底線的文字連結（課程「了解課程」、文章「閱讀全文」，其他「了解更多」）。
- 整張卡片都可以點。hover 時邊框變 `border-line-strong`、標題加底線，**不浮起來**。

`/tutors` 導師列表不是卡片，而是「人像＋文字」左右交替的版面，保留原樣，只換字體、顏色和圓角。

### 6.4 CTA 色帶（CallToAction）

- 滿版 `bg-anchor` 深紫色帶，沒有毛玻璃、裝飾和浮水印。
- 左邊明體標題（紙色，約 30px）加黑體副標題（淡紫灰），右邊按鈕：第一個是紙色底、深紫字；第二個是白色（紙色）外框。
- 文章裡的 CTA 限制在內文欄內，`rounded-sm`，不滿版。

### 6.5 頁面大圖（Hero）

- **HighImpact**：圖片滿版。桌面（≥ 1024px）是由左到右的漸層（紙色 97% → 34% 處 90% → 66% 處透明），文字直接放在淡掉的那一側。**手機與平板（< 1024px）**圖片在上，往下淡成紙色，文字放在下面。原因是窄螢幕上左右漸層的文字對比不夠。
- **MediumImpact**：左文右圖各半。手機上文字在上、圖片在下。圖片 `rounded-sm`，不加邊框和陰影。
- **LowImpact**：只有文字，置中的明體大標題，沒有圖片。
- hero 的標題是明體 700（手機 30px，md 起 46px），說明文字 ink-soft。hero 的文字是編輯寫的富文字，**對齊以編輯設定為準**，CSS 只寫預設值，不用 `!important`。

### 6.6 文章頁

- **頂部**：分類小標籤 → 明體標題（桌面約 40px、手機約 24px）→ 作者、日期、閱讀時間（黑體、ink-faint）→ 40px 長的 lilac 細線。封面圖在標題下方，寬度等於內容容器，比例約 2:1，手機 4:3。**沒有封面圖就不顯示**，不會留空白框。
- **內文**：內文欄約 620px，明體 500，桌面 18px、行高 2.0。文章內文是純 CSS（`src/app/(frontend)/styles/article.css`），不是 Tailwind 的 typography 插件（已移除）；要改文章字級、間距，直接改這個檔案，不需要改插件設定。第一段是導言（約 20px、600、`anchor` 色）；如果第一個節點不是段落（例如圖片），就沒有導言樣式。沒有導言時（有沒有目錄都一樣），內文的第一個節點貼齊欄位頂端，沒有多餘的上邊距（例如文章以 H2 開頭）。
- **H2**：明體 700，手機約 24px、桌面約 27px，**預設置中**，上方有 `01`、`02` 形式的編號（黑體、iris-soft）。編輯器設定的 `start`／`left` 對齊會呈現為置中；明確設定的置中、靠右、兩端對齊會照設定。
- **H3**：明體 700 約 21px，靠左。**H4**：黑體小字、iris、字距加寬。
- **分隔線**：不畫線，改成置中的三顆 lilac 小菱形。
- **連結**：ink 文字加 iris 底線，hover 時文字變 iris。
- **表格**：黑體 15px、靠左、每列 1px `line`、表頭下方 2px `ink` 線。表格外層可以橫向捲動，手機上不會撐破版面。
- **引言（Quote）**：置中、明體 600 約 25px、`anchor` 色，前後加「」；作者用黑體小字、ink-faint。
- **提示框（Banner）**：不用色塊，上下各一條 `line-strong` 細線，上方一個黑體小標籤。顏色依樣式：info（提示）iris、success（重點）success-text、warning（注意）warning-text、error（重要）error。
- **圖片（MediaBlock）與影片（YouTube）**：寬度等於內文欄，不向兩側延伸，圖說黑體 13px、ink-faint、置中。
- **Code**：深色底（ink）、`rounded-sm`，保留複製按鈕。
- **相關文章**：標題「相關文章」（明體、置中、下方 iris 短線），下面三欄卡片。

### 6.7 目錄（TOC）

- 由文章內的 **H2** 自動產生，編輯不用做事。H2 少於 2 個就不顯示目錄。
- 每個 H2 會加上 `section-N` 的 `id`，目錄連結跳到那裡。
- **桌面（≥ 1280px）**：目錄放在內文欄左側，跟著捲動（sticky），目前閱讀的那一節用 ink 粗體加 iris 編號標示。外層是 `<nav aria-label="目錄">`（導覽地標，不是 `aside`）。
- **手機與平板（< 1280px）**：
  - 導言後面有一個內嵌目錄框，預設收起，點「展開」看完整清單。
  - 捲過目錄框之後，header 下方出現 36px 的置頂小條，附 2px iris 閱讀進度條。點小條從上方展開目錄，點選一節後平滑捲動過去（有 `prefers-reduced-motion` 時不用平滑）。
- 跳轉時會扣掉 header 與小條的高度，標題不會被蓋住。
- 目錄面板的 `aria-expanded` 要正確，可以用鍵盤操作。

### 6.8 手風琴（CollapsibleBlock）

- 不用一張張卡片，改成上下細線分隔的清單。標題明體，右邊 chevron；展開後顯示內容。展開動畫在 `globals.css` 的 `.collapsible-content`。

### 6.9 Tabs、Timeline、分頁

- **Tabs**：黑體分頁標籤，選中的是 ink 字加 2px iris 底線。
- **Timeline**：`line` 色直線、iris 圓點、明體標題。
- **分頁（Pagination）**：黑體數字，目前頁用 ink 粗體加底線。

### 6.10 內容區塊（ContentBlock）與學員分享

- 沒有底色時透明、不加內距。有背景圖時用 `rounded-sm`，文字對比不足時加漸層遮罩。
- 「學員分享」（圖片＋名字＋身分＋內文）：名字明體約 21px，身分用黑體小字 iris，內文明體，圖片 `rounded-sm`。

### 6.11 頁面長文（prose）

- 明體約 16.5px、行高 2.0。這也是純 CSS（`src/app/(frontend)/styles/prose.css`），不靠 Tailwind 的 typography 插件（已移除）；要改頁面長文的樣式，改這個檔案。H2 是區塊大標題（明體 700 約 28–34px），下方一條 32px 的 iris 短線，短線跟著標題對齊（置中標題，短線就置中）。

## 7. 保留原版的部分（chrome）

以下部分保留目前的版面、顏色和樣子（業主明確說原版比較好看）：

- **社交條**、**公告列**、**選單**（含桌面下拉選單與手機選單）、**footer**。
- 顏色全部由 `chrome-*` token 指定（見 2.3），不是由調色盤間接得到。
- 允許的改動只有：圓角改用新的圓角尺寸、字體跟著全站換成黑體的系統字體、程式碼整理。
- **只在手機（< 768px）** 把社交條和公告列縮小一點（QR 縮小、上下內距和字級減少），讓文章內容早一點出現。
- 公告列和 footer 是深色底，focus 外圈用 `shadow-focus-inverse`。
- WhatsApp 浮動按鈕、Google 翻譯小工具外觀不變。Google 翻譯小工具會避開手機目錄小條，不蓋住它的展開按鈕。

## 8. 要改顏色或字體時，改哪裡

| 想改的東西 | 改哪裡 |
|---|---|
| 主色（深紫、品牌紫）、紙色、墨色、線色 | `src/app/(frontend)/globals.css` 的「一、調色盤」那一段，改 hex 值即可 |
| 按鈕、標籤、卡片等用到哪個顏色 | `globals.css` 的「二、語意顏色」，它只是指向調色盤，通常不用改 |
| 頂部社交條、公告列、選單、footer 的顏色 | `globals.css` 的「三、chrome」。這一段是原版外觀，改之前先截圖比較 |
| 標題、內文用的明體 | `src/app/(frontend)/fonts.ts` 換 Google 字型名稱；字重固定為 500，要維持單一字重（見第 3 節）。`globals.css` 的「四、字體」決定 fallback |
| 黑體（系統字體） | 只改 `globals.css` 的「四、字體」裡的 `--font-sans`，不用動 `fonts.ts` |
| 圓角、陰影 | `globals.css` 的「五、圓角」和「六、陰影」 |
| 文章頁的字級、間距、H2 樣式 | `src/app/(frontend)/styles/article.css` 和 `prose.css` |
| 大圖的漸層與文字 | `src/app/(frontend)/styles/hero.css` |
| CTA 色帶的文字樣式 | `src/app/(frontend)/styles/cta.css` |

- 改了 `globals.css` 或 `fonts.ts` 後，請重新整理頁面；如果字型沒有變，停掉 `pnpm dev` 再啟動。
- `fonts.ts` 的明體要維持 `weight: '500'` 單一字重；改成多個字重或 `'variable'` 會讓下載量變成約兩倍。黑體不在 `fonts.ts`，改黑體只改 `globals.css`。
- 改 token 名稱（不只是值）會影響所有用到它的元件，請全站搜尋後再改。
