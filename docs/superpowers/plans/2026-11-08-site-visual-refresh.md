# 網站視覺翻新（書卷風格）實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal：** 把 HPHI 前台改成書卷風格（米白紙色、明體、小圓角），文章頁加自動目錄，Tailwind 升級到 v4，並整理 UI 元件程式碼。

**Architecture：** 先在本機準備好真實資料和改動前的截圖，然後做一次外觀完全不變的 Tailwind v4 遷移。接著換掉設計 token 和字體，同時把社交條、公告、選單、footer 的顏色固定住。之後由底層往上改：共用 UI 元件 → 頂部與 footer → 文章工具函式 → 文章頁 → 目錄 → 內容區塊 → hero → 卡片與列表頁，最後清理、寫文件、全站驗收。所有改動只動渲染層，不動 Payload 的 schema。

**Tech Stack：** Next.js 16 App Router、React 19、Payload 3.91（MongoDB）、Tailwind CSS v4、`@tailwindcss/typography`、`tw-animate-css`、shadcn/ui（new-york）、`next/font/google`（Noto Sans TC、Noto Serif TC）、Playwright（只用來截圖，不加進專案）。

**Spec：** `docs/superpowers/specs/2026-11-08-site-visual-refresh-design.md`（每個 task 的實作者都要先讀相關章節，數值以 spec 為準）

## Global Constraints

- 分支：`feat/visual-refresh`。lockfile 一律用 pnpm 12.18（`pnpm ii`，不要直接用 `pnpm install`）。
- 不改任何 collection／block／global 的 `config.ts`，所以不需要 `pnpm gen:types`。如果 `src/payload-types.ts` 出現變動，代表改錯了地方。
- 不新增測試框架（`CLAUDE.md` 規定）。驗證方式是 `pnpm lint`、`pnpm exec tsc --noEmit`、`pnpm build`（需要本機 Mongo 在跑），加上截圖與 Playwright 斷言腳本。腳本一律放在 `/tmp/`，不提交。
- 元件只能用 Task 3 定義的 token。禁止原始色 class（`bg-gray-*`、`text-white`、`bg-black` 等），唯一例外是 WhatsApp 品牌綠。
- 圓角只能用 `rounded-none`、`rounded-xs`（2px）、`rounded-sm`（4px，預設）、`rounded-lg`（8px，彈出層）、`rounded-full`，含方向變體（例如 `rounded-t-sm`）。陰影只能用 `shadow-float`（浮層）和 `shadow-focus`（focus 外圈）。
- 只做淺色：不得出現 `dark:`。`color-scheme` 要寫 `only light`。
- 正式站 `https://www.hk-hphi.com` 只能 GET，任何寫入都禁止。
- 本機不要真的送出會寄信的表單（`.env` 有真的 SMTP 帳號），只驗證表單驗證的畫面。
- 程式風格：Prettier（singleQuote、no semi、printWidth 100、trailingComma all），用 `@/` 路徑別名；工具函式不修改傳入的物件，一律回傳新物件。
- Commit：conventional commits（`feat:`、`style:`、`chore:`、`refactor:`、`docs:`），不加 attribution。
- 程式產生的固定文字：日期 `2026年9月26日`；作者用「、」連接；`閱讀約 N 分鐘`；目錄標籤 `目錄`、`N 節　展開 ▾`、`收起 ▴`；卡片連結 `了解課程`（courses）、`閱讀全文`（posts）、`了解更多`（其他）；`相關文章`；Banner 標籤 info `提示`、success `重點`、warning `注意`、error `重要`。
- **模型分配（業主要求）：** 每個 task 標題後面標示實作者模型，dispatch 時照標示傳 `model`。每個 task 的 reviewer 用 Sonnet，最後的整個分支審查用 Opus。
- **截圖工具：** `node /tmp/hphi-scripts/segments.cjs <url> <name> <width> <height> <maxSegments>`，輸出 `/tmp/hphi-shots/<name>-NN.png`。Playwright 從 `/Users/aoi/Documents/workspace/QR-code-generator/Set-1/node_modules/playwright` require。標準視窗：桌面 `1440 1000`，手機 `390 844`。需要互動的檢查，另外在 `/tmp/hphi-checks/` 寫 Playwright 腳本（同一個 require 路徑）。
- 從 Task 1 開始，`docker compose` 的 mongo 和 `pnpm dev`（`http://localhost:3000`）要一直開著。每個 task 開始時先確認，沒在跑就重新啟動。如果 `pnpm build` 和 dev server 搶同一個 `.next` 目錄，就先停掉 dev server，build 完再開。
- 討論時用的草稿在 `.superpowers/brainstorm/75780-1794072499/content/`，對照外觀時用：`article-directions-v2.html`（選 B）、`toc-mobile.html`（手機選做法 2）、`home-b.html`（只參考學員分享、CTA、課程卡片）、`hero-options.html`（選 3）。

## Review Focus

1. **編輯設定的對齊**：Lexical 會把置中、靠右輸出成 inline `text-align`。新的 CSS 不可以用 `!important` 或其他方式蓋掉它，置中的標題和段落要維持置中。（檢查放在 Task 7、Task 9）
2. **文章缺欄位**：沒有封面圖、沒有分類、沒有作者、H2 少於 2 個、第一個節點不是段落時，頁面要完整：不留空白框、不顯示目錄、沒有導言樣式。（Task 6 斷言＋Task 7、8 截圖，用 Task 1 建立的「邊界測試」文章）
3. **390px 手機上的長表格、長英文字串、長網址**：頁面不能橫向捲動（`document.documentElement.scrollWidth === 390`）。（Task 7、Task 9）
4. **header 高度改變**：公告或社交條被關掉、公告換行時，目錄跳轉後的 H2 不能被 header 或目錄小條蓋住，Google 翻譯小工具不能蓋住小條的按鈕。（Task 8）
5. **深色模式**：系統是深色，或 Chrome 開了強制深色時，網站仍然是淺色。（Task 3、Task 14）

---

### Task 1：本機環境、驗收資料、改動前截圖【Sonnet】

**Files:**
- Modify: `.gitignore`（加 `.superpowers/`）
- Commit: spec 與本計畫
- 不提交：`/tmp/hphi-import/`（匯入腳本）、`/tmp/hphi-shots/base-*`、`/tmp/hphi-shots/chrome-colors.json`

**Interfaces:**
- Produces：本機 Mongo 有正式站已發佈的內容；本機管理員帳號 `dev@local.test`／`dev-password-123`（只存在本機）；兩篇本機專用文章，slug 為 `toc-fixture` 和 `edge-fixture`；改動前截圖 `/tmp/hphi-shots/base-{home,post,posts,tutors,tutor,course,search}-{1440,390}-NN.png`；`/tmp/hphi-shots/chrome-colors.json`。

- [ ] **Step 1：提交文件**
  在 `.gitignore` 加一行 `.superpowers/`，然後執行 `git add .gitignore docs/superpowers/specs/2026-11-08-site-visual-refresh-design.md docs/superpowers/plans/2026-11-08-site-visual-refresh.md && git commit -m "docs: add visual refresh design and plan"`。

- [ ] **Step 2：啟動資料庫和 dev server**
  執行 `open -a OrbStack`，等到 `docker ps` 不再報錯，再 `docker compose up -d mongo`。接著在背景執行 `pnpm dev`。
  預期結果：`curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/admin` 回傳 `200`。

- [ ] **Step 3：寫匯入腳本 `/tmp/hphi-import/import.ts`，用 `pnpm payload run` 執行**
  - 從正式站 GET `https://www.hk-hphi.com/api/<slug>?depth=0&limit=0&pagination=false`，依序抓 `media`、`categories`、`tutors`、`courses`、`posts`、`pages`。`forms` 如果回 403 就略過。globals 用 `/api/globals/header?depth=0` 和 `/api/globals/footer?depth=0`。
  - 寫入時用 `payload.db.*`（adapter 層）並保留原本的 `id`，不要用 `payload.create`，以免觸發 revalidate、slug 等 hooks。`mongooseAdapter` 有 `allowIDOnCreate` 選項可以參考，但**不可以**把對 `src/payload.config.ts` 的修改提交進去。
  - 用 `data-backup/2025-12-24/ngh.json` 對照資料庫原本的儲存格式：頂層的 relationship／upload 欄位是 ObjectId，rich text JSON 裡的 id 則是字串。
  - media 檔案已經在 `public/media/`，不用下載。抽查幾筆 media 的 `filename`，確認檔案存在。
  - 建立本機管理員 `dev@local.test`／`dev-password-123`。
  - 如果 `payload run` 在 `/tmp` 下無法解析 `@/` 別名，可以暫時把腳本放在 `scripts/tmp-import.ts`，用完刪掉，絕對不要提交。
  - 時間上限：大約 1 小時還無法讓首頁顯示真實內容的話，改用 Step 5 的備案，並在回報中說明。

- [ ] **Step 4：確認匯入成功**
  預期結果：`http://localhost:3000/` 顯示「開啟心靈新視界」；`/posts` 列表有文章；正式站上「眼睛望左上就是說謊？」那篇文章（從 `/posts` 的連結取得 slug）在本機能打開，並顯示封面圖。

- [ ] **Step 5（只有 Step 3 失敗時才做）：備案資料**
  登入本機 admin，手動建立：Header global（公告＋三個社交渠道）、首頁（HighImpact hero＋Content 兩欄＋Archive（courses）＋CTA），以及至少一門課程和一位導師。

- [ ] **Step 6：建立兩篇本機專用文章**（不論走哪條路都要做；只存在本機）
  - `toc-fixture`：有封面、有分類、有作者。內容依序是：一段導言、5 個 H2（每個 H2 下有 3 段長段落）、一個 6 列的表格（其中一格是 120 字的長句）、一個 Quote 區塊、一個 Banner（info）、一個 MediaBlock、一段置中對齊的段落、一個置中對齊的 H2。
  - `edge-fixture`：沒有封面、沒有分類、沒有作者；第一個節點是 MediaBlock；只有 1 個 H2；表格裡有一個 200 字元、沒有空格的網址。

- [ ] **Step 7：改動前截圖與 chrome 顏色**
  分別截取首頁、`toc-fixture`、`/posts`、`/tutors`、一位導師、`/courses/cef-nlp-qf-level-3`、`/search?q=NLP`，每頁都截 1440 和 390 兩個寬度，`name` 用 `base-<頁>-<寬>`。
  另外用 Playwright 讀出社交條、header、公告列、選單連結（一般和目前頁）、footer 的 `getComputedStyle` 背景色、文字色、邊框色，包括它們祖先一直到 `html` 的背景色，存成 `/tmp/hphi-shots/chrome-colors.json`。Task 3 會用這些值算出實際看到的不透明顏色。

---

### Task 2：Tailwind v4 遷移（外觀不變）【Sonnet】

**Files:**
- Modify: `package.json`、`pnpm-lock.yaml`、`postcss.config.js`、`src/app/(frontend)/globals.css`、`components.json`，以及升級工具改到的 `*.tsx`
- Create: `src/app/(frontend)/styles/prose.css`
- Delete: `tailwind.config.mjs`

**Interfaces:**
- Produces：`globals.css` 開頭依序 import `tailwindcss`、`tw-animate-css`、`@plugin "@tailwindcss/typography"`、`./styles/prose.css`。這個 task 的 token 仍然是舊值。

- [ ] **Step 1：執行官方升級工具** `npx @tailwindcss/upgrade`，逐檔看過 diff。
- [ ] **Step 2：整理相依套件**（照 repo 習慣釘死精確版本，不用 `^`）：加入 `tailwindcss@4`、`@tailwindcss/postcss`、`tw-animate-css`；移除 `autoprefixer`、`tailwindcss-animate`；`tailwind-merge` 升到支援 v4 的 3.x；`@tailwindcss/typography` 用最新的 0.5.x。`postcss.config.js` 只留 `@tailwindcss/postcss`。執行 `pnpm ii`。
- [ ] **Step 3：把 `tailwind.config.mjs` 的內容搬進 CSS**
  - 顏色、圓角、陰影、動畫、字體搬到 `@theme`，數值不變。
  - `container` 設定改成 `@utility container`，行為不變。斷點不變，所以 `src/cssVariables.js` 也不用改，但要核對一次兩邊一致。
  - 先查 `safelist` 每一項是否仍有程式在動態組字串（例如 `lg:col-span-*`），還需要的才改寫成 `@source inline("...")`。
  - typography 的自訂樣式搬到 `styles/prose.css`，用 `.prose h2 { ... }` 這種選擇器（優先權會高過 plugin 的 `:where()`）。
  - 保留 v3 的預設邊框色：base layer 裡寫 `*, ::before, ::after { border-color: var(--color-border); }`。
- [ ] **Step 4：刪除 `tailwind.config.mjs`**，`components.json` 的 `tailwind.config` 改成 `""`。
- [ ] **Step 5：確認可以建置**：執行 `pnpm lint && pnpm exec tsc --noEmit && pnpm build`。預期結果：三個都成功，沒有 error。
- [ ] **Step 6：比對外觀**：照 Task 1 Step 7 的頁面清單截圖，`name` 用 `v4-<頁>-<寬>`，和 `base-*` 逐張比對。預期結果：除了反鋸齒之外看不出差別。特別注意 v4 的預設值改變（ring 寬度、shadow 和 rounded 改名、placeholder 顏色）。
- [ ] **Step 7：Commit** `chore: migrate to Tailwind CSS v4`

---

### Task 3：設計 token、字體、只做淺色、固定 chrome 顏色【Sonnet】

**Files:**
- Modify: `src/app/(frontend)/globals.css`、`src/app/(frontend)/layout.tsx`、`package.json`／`pnpm-lock.yaml`（移除 `geist`）
- Create: `src/app/(frontend)/fonts.ts`
- Modify（只換顏色 class）: `src/Header/Component.tsx`、`src/Header/SocialStrip/index.tsx`、`src/Header/SocialStrip/SocialChannelCard.tsx`、`src/Header/Announcement.tsx`、`src/Header/MainNav/*.tsx`、`src/Header/MobileNav/*.tsx`、`src/Footer/*.tsx`
- Modify（只刪 `dark:`）: `src/blocks/CallToAction/Component.tsx`、`src/app/(frontend)/posts/page/[page]/page.tsx`、`src/components/RichText/index.tsx`
- Modify（全域取代）: 所有 `shadow-lift-focus` 換成 `shadow-focus`

**Interfaces:**
- Produces（後面所有 task 都用這組名稱）：
  - 調色盤：`paper #f7f4ee`、`paper-raised #fbf9f5`、`paper-sunken #efe9df`、`ink #2b2622`、`ink-soft #4a423b`、`ink-faint #7a716a`（即 spec 表中的「muted」）、`line #e2dbd0`、`line-strong #d9d1c6`、`iris #6241a0`、`iris-soft #8865bb`、`lilac #b9aacd`、`anchor #3d2b5f`、`success #5a8a64`、`warning #c08a2b`、`error #b8413f`。都寫成 `--color-<名稱>`。
  - shadcn 語意 token（指向調色盤）：background=paper、foreground=ink、card／popover=paper-raised、card-foreground／popover-foreground=ink、primary=anchor、primary-foreground=paper、secondary／muted／accent=paper-sunken、secondary-foreground／accent-foreground=ink、muted-foreground=ink-faint、destructive=error、destructive-foreground=paper、border／input=line、ring=iris。
  - chrome token（數值由 `chrome-colors.json` 合成為不透明色，讓外觀和現在一樣）：`chrome-strip`、`chrome-strip-border`、`chrome-header`（可以保留半透明加 blur，但合成後要和現在一樣）、`chrome-header-border`、`chrome-announcement`、`chrome-announcement-foreground`、`chrome-nav`、`chrome-nav-active`、`chrome-footer`、`chrome-footer-foreground`、`chrome-footer-line`。
  - 字體：`--font-sans`（`var(--font-noto-sans), 'PingFang TC', 'Microsoft JhengHei', sans-serif`）、`--font-serif`（`var(--font-noto-serif), 'Songti TC', 'PMingLiU', serif`）、`--font-mono`（`ui-monospace, SFMono-Regular, Menlo, monospace`）。
  - 圓角：`--radius-*: initial;` 之後只定義 `--radius-xs: 2px`、`--radius-sm: 4px`、`--radius-lg: 8px`。
  - 陰影：`--shadow-*: initial;` 之後只定義 `--shadow-float: 0 16px 32px -16px rgb(43 38 34 / 0.35)` 和 `--shadow-focus: 0 0 0 3px color-mix(in srgb, var(--color-iris) 25%, transparent)`。
  - `src/app/(frontend)/fonts.ts` export `fontSans`（`Noto_Sans_TC`，weight `['400','500','700']`，variable `--font-noto-sans`）和 `fontSerif`（`Noto_Serif_TC`，weight `['500','600','700']`，variable `--font-noto-serif`）。兩者都設 `subsets: ['latin']`、`display: 'swap'`、`preload: false`。

- [ ] **Step 1：寫斷言腳本 `/tmp/hphi-checks/theme.cjs`**（Playwright，打開 `http://localhost:3000/`）：
  - `getComputedStyle(document.body).backgroundColor === 'rgb(247, 244, 238)'`
  - 用 `browser.newContext({ colorScheme: 'dark' })` 再檢查一次，背景色仍然相同
  - `document.querySelector('meta[name="color-scheme"]').content === 'only light'`
  - `getComputedStyle(document.querySelector('h1, h2')).fontFamily` 符合 `/Noto[ _]Serif[ _]TC/`（next/font 產生的名稱會用底線，例如 `__Noto_Serif_TC_xxxx`）
  - `getComputedStyle(document.body).fontFamily` 符合 `/Noto[ _]Sans[ _]TC/`
- [ ] **Step 2：執行腳本，確認失敗**：`node /tmp/hphi-checks/theme.cjs`。預期結果：背景色斷言失敗（目前是淡紫色）。
- [ ] **Step 3：實作 `globals.css`**
  - 依序分成「調色盤（改主色改這裡）」「語意顏色」「chrome（保留原版外觀，不要隨意改）」「字體」「圓角」「陰影」「動畫」幾段，每段和每個 token 都加中文註解。
  - base layer：`:root { color-scheme: only light; }`；`body` 套用 `bg-background text-foreground font-sans`；`h1, h2, h3, h4` 套用 `font-serif`。
- [ ] **Step 4：實作 `fonts.ts` 並改 `layout.tsx`**
  - `<html>` 的 className 換成 `fontSans.variable`、`fontSerif.variable`，移除 Geist。
  - 移除 `<body className="bg-primary/10">` 的 class。
  - `<head>` 加上 `<meta name="color-scheme" content="only light" />`。
  - 從 `package.json` 移除 `geist`，執行 `pnpm ii`。
- [ ] **Step 5：固定 chrome 顏色**：Files 列出的 Header／Footer 元件只把顏色 class 換成 chrome token，其他 class 不動。
- [ ] **Step 6：刪掉所有 `dark:` class**，並把所有 `shadow-lift-focus` 取代為 `shadow-focus`。其他 `shadow-lift-*` 會變成無效 class，後面的 task 會清掉。
- [ ] **Step 7：執行腳本，確認通過**：`node /tmp/hphi-checks/theme.cjs` 的斷言全部通過。接著執行 `pnpm lint && pnpm exec tsc --noEmit` 確認成功。
- [ ] **Step 8：比對 chrome 外觀**：截取首頁 1440 和 390（`name` 用 `t3-home-<寬>`），把社交條、公告、header、footer 和 `base-home-*` 比對。預期結果：顏色看不出差別。頁面其他部分變成米白底是正常的。
- [ ] **Step 9：Commit** `feat: book-style design tokens, Noto fonts, light-only`

---

### Task 4：共用 UI 元件與表單類元件【Sonnet】

**Files:**
- Modify: `src/components/ui/{button,input,textarea,select,checkbox,radio-group,label,badge,card,dialog,popover,calendar,navigation-menu,pagination,collapsible,timeline}.tsx`、`src/components/Link/index.tsx`
- Modify（只清掉原始色、舊圓角、舊陰影，改用共用元件的樣式）: `src/blocks/Form/**`、`src/blocks/BookList/**`、`src/blocks/CEFCalculator/Component.tsx`、`src/blocks/TimeSlot/Component.tsx`、`src/components/sections/TimeSlot.tsx`、`src/components/{DatePicker,DateRangePicker,SignUp,UploadForm,KnowMoreCourseInfo,Closed,WhatsAppUs,AnimatedWhatsAppUs}.tsx`

**Interfaces:**
- Produces：`buttonVariants`
  - variants：`default`（bg-primary text-primary-foreground hover:bg-anchor/90）、`outline`（border border-ink text-ink hover:bg-paper-sunken）、`ghost`（hover:bg-paper-sunken）、`link`（underline underline-offset-4 decoration-iris）、`paper`（bg-paper text-anchor，給深色底上用）、`paperOutline`（border border-paper/70 text-paper，給深色底上用）
  - sizes：`sm` h-9 px-4、`default` h-11 px-6、`lg` h-13 px-8、`icon` size-11 rounded-full
  - 除了 `icon`，其餘一律 `rounded-sm`、黑體 500、字距 0.05em
- Produces：CMSLink 的 `appearance`（`src/fields/link.ts` 裡的 `default`、`outline` 等）對應到同名的 button variant，不改欄位設定。
- 輸入類元件：`h-11 rounded-sm border border-input bg-card px-3.5 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-focus outline-none aria-invalid:border-error`。
- 浮層類元件（Dialog、Popover、Select 內容、NavigationMenu viewport）：`rounded-lg border-border bg-popover shadow-float`。
- Checkbox、Radio 勾選時：`bg-iris border-iris`。

- [ ] **Step 1：寫斷言腳本 `/tmp/hphi-checks/ui.cjs`**：
  - 打開本機有 Form 區塊的頁面（從匯入的 pages 找 `blockType: 'formBlock'`），不填任何欄位直接按送出，確認錯誤欄位的 `borderColor === 'rgb(184, 65, 63)'`
  - 主要按鈕的 `borderRadius === '4px'`、`backgroundColor === 'rgb(61, 43, 95)'`
  - 打開書單頁，點一本書的詳細 dialog，確認 dialog 的 `borderRadius === '8px'`
- [ ] **Step 2：執行腳本，確認失敗。**
- [ ] **Step 3：實作 Files 列出的元件。** shadcn 元件要用 CLI 重新產生 v4 版本後再套 token，還是就地修改，由實作者決定。
- [ ] **Step 4：執行腳本，確認通過**，並執行 `pnpm lint && pnpm exec tsc --noEmit` 確認成功。
- [ ] **Step 5：檢查違規 class**：`grep -rnE "rounded(-[trblse]{1,2})?-(md|xl|2xl|3xl)\b|\brounded\b[^-]|shadow-lift|bg-(gray|green|black|white)" src/components/ui src/blocks/Form src/blocks/BookList src/blocks/CEFCalculator src/components/sections`。預期結果：沒有輸出。
- [ ] **Step 6：Commit** `feat: restyle shared UI primitives and form components`

---

### Task 5：社交條、公告、選單、footer：圓角與手機縮小【Haiku】

**Files:**
- Modify: `src/Header/SocialStrip/index.tsx`、`src/Header/SocialStrip/SocialChannelCard.tsx`、`src/Header/Announcement.tsx`、`src/Header/MainNav/*.tsx`、`src/Header/MobileNav/*.tsx`、`src/Footer/*.tsx`

**Interfaces:**
- Consumes：Task 3 的 chrome token、Task 4 的 `buttonVariants`。

- [ ] **Step 1：統一圓角和陰影**：把舊圓角換成新尺寸（卡片、QR 框用 `rounded-sm`，下拉選單用 `rounded-lg`，圓形關閉按鈕維持 `rounded-full`），移除 `shadow-lift-*`。顏色不准改。
- [ ] **Step 2：手機縮小**（只改未加 `md:` 前綴的基本樣式；`md:` 以上完全不變）：
  - 社交條：QR 圖約 64px、卡片內距和文字縮小（`text-xs`）。
  - 公告列：上下內距約 6px、字級 13px。
- [ ] **Step 3：確認效果**：截取 `toc-fixture` 在 390 和 1440 的畫面（`name` 用 `t5-post-<寬>`）。預期結果：
  - 390：文章標題的頂端比 `base-post-390` 至少往上移 80px。
  - 1440：除了圓角之外，和 `base-post-1440` 一樣。
  - 點社交條和公告的 ✕ 之後它們會消失，同一個分頁重新整理後仍然是關閉狀態。
- [ ] **Step 4：執行 `pnpm lint && pnpm exec tsc --noEmit`**，確認成功。
- [ ] **Step 5：Commit** `style: align site chrome with new radius scale and compact it on mobile`

---

### Task 6：文章工具函式【Haiku】

**Files:**
- Create: `src/utilities/article/types.ts`、`formatDateZh.ts`、`joinNames.ts`、`readingTime.ts`、`headings.ts`
- 檢查腳本（不提交）: `/tmp/hphi-checks/article-utils.check.ts`

**Interfaces:**
- Produces：
  - `export type TocHeading = { id: string; text: string; number: string }`（`types.ts`）
  - `formatDateZh(iso: string): string`：以 `Asia/Hong_Kong` 時區輸出 `YYYY年M月D日`；無效的輸入回傳 `''`
  - `joinNames(names: ReadonlyArray<string>): string`：用「、」連接，空字串會被濾掉
  - `estimateReadingMinutes(state: SerializedEditorState, charsPerMinute?: number): number`：預設每分鐘 400 字；計算所有 text node 的非空白字元數，除以每分鐘字數後無條件進位，最少 1
  - `annotateH2Anchors(state: SerializedEditorState): { state: SerializedEditorState; headings: TocHeading[] }`：只處理 `root.children` 這一層的 `heading`（`tag === 'h2'`）。回傳新的 state，在每個 H2 node 上加 `anchorId: 'section-N'` 和 `anchorNumber: 'NN'`（從 1 開始，補零到兩位）。text 是子節點文字串接後去掉頭尾空白的結果。不修改傳入的物件。
  - `splitLede(state: SerializedEditorState): { lede: SerializedEditorState | null; body: SerializedEditorState }`：先忽略開頭沒有文字的空段落。如果第一個節點是有文字的 `paragraph`，`lede` 就是只含這個節點的 state，`body` 是其餘節點；否則 `lede` 為 `null`，`body` 是去掉開頭空段落後的 state。
- 這幾個檔案之間不能有 value import（只能 `import type`），這樣檢查腳本才能直接用 Node 執行。

- [ ] **Step 1：寫檢查腳本**（`node:assert/strict`，用絕對路徑 import 上面幾個 `.ts` 檔）：
  - `formatDateZh('2026-09-25T16:30:00.000Z') === '2026年9月26日'`；`formatDateZh('nope') === ''`
  - `joinNames(['甲', '', '乙', '丙']) === '甲、乙、丙'`
  - 一個含 401 個非空白字元的 state，`estimateReadingMinutes` 回傳 `2`；空 state 回傳 `1`
  - 三個 H2 加一個 H3 的 state：`headings.length === 3`，`headings[2]` 等於 `{ id: 'section-3', text: '…', number: '03' }`；傳入的 state 在呼叫前後用 `deepStrictEqual` 比對完全相同；回傳 state 裡的 H3 沒有 `anchorId`
  - `splitLede`：開頭是「空段落＋有字段落＋H2」時，`lede.root.children.length === 1`，`body.root.children[0].type === 'heading'`；第一個節點是 block 時 `lede === null`
- [ ] **Step 2：執行，確認失敗**：`node /tmp/hphi-checks/article-utils.check.ts`。預期結果：因為檔案不存在而失敗。（Node 24 可以直接執行 `.ts`；如果不行，改用 `pnpm exec tsx`。）
- [ ] **Step 3：實作 Interfaces 列出的五個檔案。**
- [ ] **Step 4：執行，確認通過**，並執行 `pnpm lint && pnpm exec tsc --noEmit` 確認成功。
- [ ] **Step 5：Commit** `feat: add article utilities for dates, authors, reading time and headings`

---

### Task 7：文章頁版面【Sonnet】

**Files:**
- Create: `src/components/Article/ArticleLayout.tsx`、`src/components/Article/ArticleHeader.tsx`、`src/app/(frontend)/styles/article.css`（由 `globals.css` import）
- Modify: `src/app/(frontend)/posts/[slug]/page.tsx`、`src/app/(frontend)/single-post/[slug]/page.tsx`（兩者都改成渲染 `ArticleLayout`，資料查詢與 metadata 維持原狀）、`src/components/RichText/index.tsx`
- Delete: `src/heros/PostHero/index.tsx`、`src/utilities/formatDateTime.ts`（PostHero 是唯一的使用者）

**Interfaces:**
- Consumes：Task 6 的全部函式。
- Produces：
  - `ArticleLayout({ post }: { post: Post })`（server component）。結構如下：
    1. `ArticleHeader`
    2. 封面圖（有 `meta.image` 才顯示）
    3. `div.article-grid`：xl 以上是 `grid-cols-[190px_minmax(0,620px)_190px] justify-center gap-10`
       - `aside[data-toc-desktop]`：xl 以上才顯示，這個 task 先留空
       - `div.article-body`：導言（`div.article-lede`）、`div[data-toc-inline]`（這個 task 先留空）、內文
    4. `div#article-end`
    5. 相關文章：標題「相關文章」，下面是 `RelatedPosts`
  - RichText 的 `heading` converter：node 上有 `anchorId` 時，輸出 `id={anchorId}` 和 `data-number={anchorNumber}`。

- [ ] **Step 1：寫斷言腳本 `/tmp/hphi-checks/article.cjs`**：
  - `/posts/toc-fixture`：`h1` 的 `fontFamily` 符合 `/Noto[ _]Serif[ _]TC/`；頁面有文字 `閱讀約`；日期文字符合 `/^\d{4}年\d{1,2}月\d{1,2}日$/`；`.article-lede` 存在；`h2#section-1` 存在，`data-number="01"`；置中的 H2 和段落計算後的 `textAlign === 'center'`（Review Focus 1）；`hr` 沒有可見的背景色塊
  - `/posts/edge-fixture`：沒有封面 `img`；沒有分類小標籤和作者的空元素；沒有 `.article-lede`
  - 兩篇文章在 390 寬度下 `document.documentElement.scrollWidth === 390`（Review Focus 3）
  - 頁面上沒有任何文字節點只包含 `,`（Tabs 的逗號 bug）
- [ ] **Step 2：執行，確認失敗。**
- [ ] **Step 3：實作版面和 `article.css`**
  - 數值照 spec 5.1、5.2：欄寬 620px、內文明體 500 18px／2.0、手機 16–17px；導言 20px／600／anchor 色；H2 置中 27px，用 `::before { content: attr(data-number) }` 顯示編號（黑體、iris-soft）；H3 21px；H4 是黑體 iris 小標籤；分隔線是三顆 lilac 菱形；連結是 ink 文字加 iris 底線；表格用 `display: block; overflow-x: auto`。
  - 封面圖寬度等於內容容器，最寬 1120px、比例 2:1、最高 560px；手機滿版、4:3。
  - 對齊只靠預設值，不寫 `!important`，讓 Lexical 的 inline `text-align` 生效。
- [ ] **Step 4：改 RichText**：加入 heading converter；刪掉 Tabs converter 後面多出的 `,`；拿掉 `col-start-*`、`col-span-*` 這些沒有作用的 class。
- [ ] **Step 5：讓兩個路由使用 `ArticleLayout`**，再刪除 `PostHero` 和 `formatDateTime.ts`。
- [ ] **Step 6：執行腳本，確認通過**，並執行 `pnpm lint && pnpm exec tsc --noEmit` 確認成功。
- [ ] **Step 7：截圖對照**：截取 `toc-fixture`、`edge-fixture` 和正式站那篇長文在 1440 和 390 的畫面（`name` 用 `t7-*`），和 `article-directions-v2.html` 的 B 方案對照整體感覺。
- [ ] **Step 8：Commit** `feat: book-style article page`

---

### Task 8：文章目錄【Sonnet】

**Files:**
- Create: `src/components/Article/Toc/useActiveHeading.ts`、`DesktopToc.tsx`、`InlineToc.tsx`、`TocBar.tsx`、`src/Header/HeaderHeightVar.tsx`
- Modify: `src/components/Article/ArticleLayout.tsx`、`src/Header/Component.tsx`、`src/app/(frontend)/styles/article.css`

**Interfaces:**
- Consumes：`TocHeading`、`annotateH2Anchors`（Task 6）；`ArticleLayout` 的 `aside[data-toc-desktop]`、`div[data-toc-inline]`、`div#article-end`（Task 7）。
- Produces：
  - `useActiveHeading(ids: ReadonlyArray<string>): string | null`：回傳最後一個頂端已經捲過「header 底部 + 48px」的 heading id
  - `DesktopToc({ headings }: { headings: TocHeading[] })`、`InlineToc({ headings }: { headings: TocHeading[] })`、`TocBar({ headings }: { headings: TocHeading[] })`，三個都是 client component
  - `HeaderHeightVar()`：client component。用 `ResizeObserver` 監看 `<header>`，把它的高度寫進 `document.documentElement.style` 的 `--header-h`
  - `TocBar` 顯示時設定 `document.documentElement.dataset.tocBar = 'visible'`，隱藏時設成 `'hidden'`
  - Google 翻譯小工具的外層加上 `data-translate-widget`；`html[data-toc-bar='visible'] [data-translate-widget]` 往下位移 36px
  - `[id^='section-']` 的 `scroll-margin-top` 是 `calc(var(--header-h) + 36px + 16px)`
- `headings.length < 2` 時，三個目錄元件都不渲染。

- [ ] **Step 1：寫斷言腳本 `/tmp/hphi-checks/toc.cjs`**（用 `toc-fixture`）：
  - **1440 寬**：`aside[data-toc-desktop]` 裡有 5 項。捲到 `#section-3` 後，目前項目顯示 `03`。點第 5 項，等捲動結束後，`#section-5` 的 `getBoundingClientRect().top >= header 的 bottom`。
  - **390 寬**：
    - 目錄框顯示 `5 節　展開 ▾`，點了之後出現 5 項，`aria-expanded="true"`。
    - 捲過目錄框後，小條出現並顯示目前章節標題。點小條會展開面板；點第 4 項後面板關閉，而且 `#section-4` 的頂端 >= header 和小條的底部。
    - 點公告列的 ✕ 之後重做一次跳轉檢查（Review Focus 4）。
    - 小條顯示時，`[data-translate-widget]` 的範圍和小條的展開按鈕不重疊。
    - 捲到 `#article-end` 之後，小條消失。
  - **`edge-fixture`**：頁面上沒有任何目錄元素。
  - 用 `reducedMotion: 'reduce'` 的 context 跑一次跳轉，沒有錯誤。
- [ ] **Step 2：執行，確認失敗。**
- [ ] **Step 3：實作 hook 和三個目錄元件**（版面照 spec 5.3 和 `toc-mobile.html` 的做法 2）：
  - 點目錄項目時呼叫 `scrollIntoView`；`prefers-reduced-motion` 時用 `behavior: 'auto'`，否則用平滑捲動。之後用 `history.replaceState` 更新網址的 hash。
  - 手機面板：開啟時把焦點移到第一項；按 Escape、點背景、點項目都會關閉。
  - 閱讀進度是目前捲動位置在 `.article-body` 範圍內的百分比。
- [ ] **Step 4：實作 `HeaderHeightVar`**，並在 Header 掛上它、替 Google 翻譯外層加 `data-translate-widget`。
- [ ] **Step 5：在 `ArticleLayout` 接上三個元件。**
- [ ] **Step 6：執行腳本，確認通過**，並執行 `pnpm lint && pnpm exec tsc --noEmit` 確認成功。
- [ ] **Step 7：Commit** `feat: article table of contents`

---

### Task 9：內容區塊【Sonnet】

**Files:**
- Modify: `src/blocks/{Quote,Banner,MediaBlock,YouTube,Code,CallToAction,Collapsible,Tabs,Timeline,Content}/Component*.tsx`、`src/components/LifeEnrichLikeTabs.tsx`（若 Tabs 用到）、`src/components/RichText/index.tsx`（CTA converter 傳 `variant="contained"`）、`src/app/(frontend)/styles/prose.css`

**Interfaces:**
- Produces：`CallToActionBlock` 新增可選 prop `variant?: 'band' | 'contained'`，預設 `'band'`。在頁面 layout 中渲染時是滿版色帶；在文章裡由 RichText 傳 `'contained'`。

- [ ] **Step 1：寫斷言腳本 `/tmp/hphi-checks/blocks.cjs`**：
  - 首頁：CTA 色帶的 `backgroundColor === 'rgb(61, 43, 95)'`，寬度等於視窗寬度；「關於我們」H2 的 `textAlign === 'center'`，下方短線也置中（Review Focus 1）
  - 首頁在 390 寬度下 `scrollWidth === 390`（Review Focus 3）
  - `toc-fixture`：Quote 的 `textAlign === 'center'`；Banner 沒有背景色塊，並顯示 `提示`；文章裡的 CTA 寬度不超過 620px
- [ ] **Step 2：執行，確認失敗。**
- [ ] **Step 3：實作 Files 列出的區塊**，照 spec 5.2、6.4、6.5：
  - CTA 拿掉毛玻璃、Bloom、IrisMark。
  - 滿版色帶不能造成橫向捲動（不要用 `w-screen`）。
  - `prose.css` 的頁面長文用明體 16.5px／2.0；H2 34px，下方 32px iris 短線跟著對齊方式（例如 `h2[style*='text-align: center']::after { margin-inline: auto }`）。
  - 學員分享欄位：H3 名字明體約 21px；H4 身分用黑體 iris 小字；圖片 `rounded-sm`。
- [ ] **Step 4：執行腳本，確認通過**，並執行 `pnpm lint && pnpm exec tsc --noEmit` 確認成功。
- [ ] **Step 5：截圖對照**：截取首頁 1440 和 390（`name` 用 `t9-home-*`），學員分享、CTA 和 `home-b.html` 對照。另外找含 Collapsible、Tabs、Timeline 的頁面截圖（在匯入的 pages 裡找 `blockType`）。
- [ ] **Step 6：Commit** `feat: restyle content blocks`

---

### Task 10：Hero【Sonnet】

**Files:**
- Modify: `src/heros/HighImpact/index.tsx`、`src/heros/MediumImpact/index.tsx`、`src/heros/LowImpact/index.tsx`

- [ ] **Step 1：寫斷言腳本 `/tmp/hphi-checks/hero.cjs`**（首頁）：
  - **1440 寬**：hero 標題的 `fontFamily` 符合 `/Noto[ _]Serif[ _]TC/`，`color === 'rgb(43, 38, 34)'`；hero 裡沒有 `svg` 裝飾；`[data-translate-widget]` 和 hero 標題的範圍不重疊。
  - **390 寬**：hero 圖片的底部 <= 標題的頂部（文字在圖片下方）。
- [ ] **Step 2：執行，確認失敗。**
- [ ] **Step 3：實作三種 hero**，照 spec 6.1、6.2：
  - HighImpact 的漸層：`linear-gradient(90deg, color-mix(in srgb, var(--color-paper) 97%, transparent) 0%, color-mix(in srgb, var(--color-paper) 90%, transparent) 34%, transparent 66%)`。
  - HighImpact 在手機上：圖片 4:3 在上，往下淡成 paper，文字在下方。
  - MediumImpact：左文右圖。LowImpact：置中標題。
  - 移除 Bloom、IrisMark、`prose-invert`。
- [ ] **Step 4：執行腳本，確認通過**，並執行 `pnpm lint && pnpm exec tsc --noEmit` 確認成功。截取首頁 1440 的畫面，和 `hero-options.html` 的第 3 個方案對照。
- [ ] **Step 5：Commit** `feat: restyle heroes`

---

### Task 11：卡片與列表頁【Sonnet】

**Files:**
- Modify: `src/components/Card/index.tsx`、`src/components/CollectionArchive/index.tsx`、`src/blocks/ArchiveBlock/Component.tsx`、`src/blocks/RelatedPosts/Component.tsx`、`src/components/Pagination/index.tsx`、`src/components/PageRange/index.tsx`
- Modify（版面不變，只換 token、字體、圓角）: `src/app/(frontend)/posts/page.tsx`、`posts/page/[page]/page.tsx`、`search/page.tsx`、`tutors/page.tsx`、`tutors/[slug]/page.tsx`、`courses/[slug]/page.tsx`、`not-found.tsx`（移除 Decoration）

**Interfaces:**
- Produces：`Card` 的 props 不變（`doc`、`relationTo`、`showCategories`、`title`、`className`）。連結文字依 `relationTo` 決定：`courses` → `了解課程`，`posts` → `閱讀全文`，其他 → `了解更多`。有分類資料才顯示分類小標籤。

- [ ] **Step 1：寫斷言腳本 `/tmp/hphi-checks/cards.cjs`**：
  - 首頁的課程卡片 `borderRadius === '4px'`，沒有 `boxShadow`（`'none'`），標題 `fontFamily` 符合 `/Noto[ _]Serif[ _]TC/`，有文字 `了解課程`
  - `/posts` 的卡片有文字 `閱讀全文`
  - `/tutors` 仍然是左右交替的整排版面（第 1、2 位導師的圖片分別在左邊和右邊）
- [ ] **Step 2：執行，確認失敗。**
- [ ] **Step 3：實作 Card 和 Files 列出的頁面**，照 spec 6.3。
- [ ] **Step 4：執行腳本，確認通過**，並執行 `pnpm lint && pnpm exec tsc --noEmit` 確認成功。截取 Files 列出的每一頁在 1440 和 390 的畫面（`name` 用 `t11-*`）。
- [ ] **Step 5：Commit** `feat: restyle cards and listing pages`

---

### Task 12：清理【Haiku】

**Files:**
- Delete: `src/components/Decoration/`（在 `grep -rn "components/Decoration" src` 沒有結果之後）
- Modify: 檢查找到的殘留檔案

- [ ] **Step 1：檢查殘留**：`grep -rnE "shadow-lift|dark:|geist|bg-muted/|text-secondary\b" src`。預期結果：沒有輸出。有的話逐一改成 Task 3 的 token。
- [ ] **Step 2：檢查圓角**：`grep -rnE "rounded(-[trblse]{1,2})?-(md|xl|2xl|3xl)\b|\brounded\b[^-]" src --include='*.tsx'`。預期結果：沒有輸出。
- [ ] **Step 3：檢查原始色**：`grep -rnE "\b(bg|text|border|from|to|via|ring|fill|stroke)-(gray|slate|zinc|neutral|stone|red|blue|green|yellow|purple|violet|indigo|pink|white|black)\b" src --include='*.tsx'`。預期結果：只剩 WhatsApp 綠。
- [ ] **Step 4：刪除 Decoration**，然後執行 `pnpm lint && pnpm exec tsc --noEmit && pnpm build`。預期結果：全部成功。
- [ ] **Step 5：Commit** `refactor: remove unused decoration and stray styles`

---

### Task 13：文件【Haiku】

**Files:**
- Modify: `DESIGN.md`（整份重寫）、`CLAUDE.md`
- Delete: `.impeccable/design.json`

- [ ] **Step 1：重寫 `DESIGN.md`**，依 spec 第 4–6 節和實際的 `globals.css`：token 表、字體分工、圓角、陰影、元件規則、哪些部分保留原版。開頭寫明「token 的唯一來源是 `src/app/(frontend)/globals.css`」。
- [ ] **Step 2：更新 `CLAUDE.md`**：
  - 「Tailwind」那一條改成：v4、token 在 `globals.css` 的 `@theme`、沒有 `tailwind.config.mjs`、只做淺色。
  - 加上字體在 `src/app/(frontend)/fonts.ts`，以及文章版面在 `src/components/Article/`。
  - 刪掉提到 `tailwind.config.mjs` 和 `safelist` 的舊說明。
- [ ] **Step 3：刪除 `.impeccable/design.json`。**
- [ ] **Step 4：Commit** `docs: document the book-style design system`

---

### Task 14：全站驗收【Sonnet】

**Files:** 不改程式碼。如果發現問題，回報給 controller，由它開修正 task。

- [ ] **Step 1：執行 `pnpm lint && pnpm exec tsc --noEmit && pnpm build`**。預期結果：全部成功。
- [ ] **Step 2：重跑所有檢查腳本**：`/tmp/hphi-checks/*.cjs` 和 `article-utils.check.ts`。預期結果：全部通過。
- [ ] **Step 3：截取最終畫面**：照 Task 1 Step 7 的頁面清單截取 1440 和 390（`name` 用 `final-*`），和 `base-*` 並排檢查有沒有破版或殘留舊樣式。
- [ ] **Step 4：檢查互動功能**（不要送出會寄信的表單）：
  - 表單：空白送出時顯示錯誤樣式。
  - 書單：選兩本書後，WhatsApp 連結的 `href` 包含這兩本書名（不要打開連結）。
  - CEF 計算器算得出結果；預約時段正常顯示。
  - 搜尋 `NLP` 有結果；手機選單可以開關。
- [ ] **Step 5：檢查強制深色**：用 `chromium.launch({ args: ['--enable-features=WebContentsForceDark'] })` 打開首頁和文章，`body` 背景仍然是 `rgb(247, 244, 238)`，而且截圖看起來是淺色。
- [ ] **Step 6：寫驗收報告**：每一項寫明通過或不通過，附上截圖路徑。沒有實機可以測 Samsung Internet，要在報告裡註明。
