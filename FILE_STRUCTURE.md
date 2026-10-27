# UMEZOME - サイト構成・ファイル説明書

> 智学館中等教育学校 梅染め探究 PBL Webサイト  
> 最終更新: 2024年10月

---

## ファイル階層

```
UMEZOME/
├── index.html                     ← 【トップページ】最初に開くファイル
│
├── FILE_STRUCTURE.md              ← このファイル（構成説明書）
│
├── src/                           ← サイトのソースコード
│   ├── components/                ← 【共通パーツ】独立HTMLファイル
│   │   ├── header.html            - 全ページ共通ヘッダー（ナビゲーション）
│   │   └── footer.html            - 全ページ共通フッター
│   │
│   ├── pages/                     ← 各ページのHTMLファイル
│   │   ├── about.html             - 活動概要ページ（詳細版）
│   │   ├── news.html              - ニュース一覧ページ
│   │   ├── events.html            - イベント一覧ページ
│   │   ├── blog.html              - ブログ一覧ページ
│   │   ├── products.html          - 製品紹介ページ
│   │   ├── achievements.html      - 実績・受賞ページ
│   │   └── documents.html         - 資料ダウンロードページ
│   │
│   └── assets/                    ← 静的ファイル
│       ├── css/
│       │   └── style.css          ← 【重要】全スタイルはここ1ファイルで管理
│       ├── js/
│       │   ├── main.js            ← 全ページ共通の基本機能（スライドショー等）
│       │   └── components.js      ← 【Fetch API】ヘッダー・フッター自動読み込み
│       └── docs/                  ← 将来: PDFの組み込み埋め込み用
│                                     ※ ダウンロード用PDFは deta/ フォルダへ
│
├── picture/                       ← 写真フォルダ（全写真はここに入れる）
│   ├── 1714727376145.jpg          - ワークショップ・製品の様子
│   ├── 1714727555xxx.jpg          - 製品写真各種
│   ├── 1715059xxx.jpg             - 実験・活動の様子
│   ├── DSC_4xxx.JPG               - 各種活動写真（高解像度）
│   ├── DSC_4xxx〜4xxx.JPG         - ワークショップ・イベント写真
│   ├── DSC_4628〜4648.JPG         - 活動写真（高解像度）
│   ├── DSCPDC_xxxx.JPG            - バーストモード撮影写真
│   ├── IMG_xxxx.HEIC / .heic      - iPhone撮影写真（要変換）
│   └── 薄めた染液*.heif            - 染液実験写真
│   ⚠️ HEIC/HEIF形式はブラウザで表示できません。
│      JPG/PNG形式に変換してから使用してください。
│
├── images/                        ← 予備フォルダ（現在未使用）
│
└── deta/                          ← 資料・PDFフォルダ（ダウンロード用）
    ├── 5年間の梅染め探究〜.pdf      - 活動まとめレポート
    ├── 2024 智学館15期生PBL.pdf    - 2024年PBL発表スライド
    ├── 2024年度3年次PBL〜.zip      - 写真アーカイブ
    ├── 3年次PBLday スライド.pdf    - PBL Day スライド
    ├── 第16回ユネスコスクール〜.pdf - ユネスコ大会発表資料
    ├── MATOME-------.pdf           - 活動まとめ
    ├── PBLDAY 三上 真音.pdf        - PBL Day個人発表
    ├── PBL製.pdf                   - 製品関連資料
    ├── 【五十嵐１班】〜.pdf         - 班別発表スライド
    ├── 【八木班】〜.pdf             - 班別発表スライド
    ├── 【山崎班】〜.pdf             - 班別発表スライド
    ├── 2023年度 PBL Day〜.pdf      - 2023年度発表スライド（前期・後期）
    ├── 2023年度2・3年次PBL〜.pdf   - PBLガイダンス資料
    ├── ボランティア・スピリット〜.pdf - アワード申請資料
    ├── 真海了誠 - Google.pdf        - 個人発表資料
    └── 【五十嵐１班】発表原稿.pdf   - 発表原稿
```

---

## 各ファイルの役割

### 📄 index.html（トップページ）
- サイトのメインページ
- ヒーロー、活動概要（要約）、ニュース、イベント、ブログ、製品、実績、資料、お問い合わせ
- すべてのセクションが1ページに収まっている
- 詳細な活動概要は `src/pages/about.html` を参照

### 📂 src/pages/ （各詳細ページ）

| ファイル | 概要 | 追加方法 |
|----------|------|----------|
| `about.html` | 活動概要詳細・タイムライン・FAQ | `.news__item`（タイムライン）、`.faq__item`（FAQ）を追加 |
| `news.html` | ニュース一覧 | `.card` をコピーして `data-category` を設定 |
| `events.html` | イベント一覧 | `.event-card` をコピー |
| `blog.html` | ブログ記事一覧 | `.card` をコピー |
| `products.html` | 製品紹介・フォトギャラリー | `.product-card` をコピー、`.photo-gallery__item` で写真追加 |
| `achievements.html` | 実績・受賞・活動タイムライン | `.card` をコピー |
| `documents.html` | 資料ダウンロード | `.doc-card` をコピーして href を変更 |

### 🎨 src/assets/css/style.css（スタイルシート）
**全スタイルはこのファイル1つで管理しています。**
ファイルの先頭に目次があるので、`Ctrl+F` で目的のセクションを検索してください。

**目次（検索キーワード）:**
| 番号 | セクション | 検索ワード |
|------|-----------|-----------|
| 1 | カラーパレット・変数 | `CSS VARIABLES` |
| 2 | フォント設定 | `FONTS` |
| 3 | リセット・基本設定 | `RESET` |
| 4 | ヘッダー・ナビ | `HEADER` |
| 5 | ヒーロー | `HERO` |
| 6 | セクション共通 | `SECTION COMMON` |
| 7 | 活動概要 | `ABOUT` |
| 8 | ニュース | `NEWS` |
| 9 | イベント | `EVENTS` |
| 10 | ブログ | `BLOG` |
| 11 | 製品紹介 | `PRODUCTS` |
| 12 | 実績 | `ACHIEVEMENTS` |
| 13 | 資料 | `DOCUMENTS` |
| 14 | よくある質問 | `FAQ` |
| 15 | お問い合わせ | `CONTACT` |
| 16 | フッター | `FOOTER` |
| 17 | モーダル | `MODAL` |
| 18 | アニメーション | `ANIMATIONS` |
| 19 | レスポンシブ | `RESPONSIVE` |
| 20 | ユーティリティ | `UTILITIES` |

主要なカスタマイズポイント:
```css
/* 色を変えたいとき → :root の --color-plum-* を変更 */
:root {
  --color-plum-500: hsl(340, 52%, 52%);  /* メインカラー（梅ピンク） */
}
```

### 🧩 src/components/ （共通コンポーネント）
全ページで共通して使われるヘッダーとフッターを独立したHTMLとして管理しています。
JavaScript (Fetch API) により、各ページのプレースホルダーへ自動挿入されます。

| ファイル | 概要 | 編集時の注意 |
|----------|------|-------------|
| `header.html` | 共通ヘッダー（ロゴ・ハンバーガー・ナビ） | リンクを追加するときは `data-page="識別名"` を付与 |
| `footer.html` | 共通フッター（サイトマップ・学校情報・著作権） | リンクを追加するときは `data-page="識別名"` を付与 |

> ⚠️ **重要（Live Server 等のWebサーバーが必須）:**  
> ブラウザでファイルを直接ダブルクリック（`file://` プロトコル）すると、セキュリティ制約（CORS）により Fetch API がブロックされヘッダーやフッターが表示されません。  
> VS Code の拡張機能「**Live Server**」を使うか、ローカルWebサーバー（例: `python3 -m http.server 8000`）を起動して `http://localhost:...` で開いてください。

### ⚡ src/assets/js/components.js（コンポーネントローダー）
Fetch API を使って `header.html` と `footer.html` を読み込みます：
- `loadComponent(selector, path)` — 外部HTMLファイルを非同期取得して挿入
- `getPageContext()` — 現在の階層（ルートか `src/pages/` か）を自動判定
- `fixComponentLinks()` — ページの階層に合わせてリンクパス（`href`）を自動調整し、現在ページのメニューに `active` クラスを自動付与
- `setupHeaderInteractions()` — ヘッダー挿入後にハンバーガーメニューやスクロール機能を初期化

### ⚡ src/assets/js/main.js（JavaScript）
全ページで共通して使う機能（モジュール形式）:
- `initHeaderScroll()` — ヘッダーのスクロールエフェクト
- `initHamburgerMenu()` — ハンバーガーメニュー（スマートフォン用）
- `initScrollAnimation()` — スクロールアニメーション
- `initHeroSlideshow()` — ヒーロースライドショー
- `initBackToTop()` — ページトップへ戻るボタン
- `initModals()` — モーダルウィンドウ
- `initSmoothScroll()` — スムーススクロール
- `initActiveNav()` — アクティブナビ更新

---

## パスの基準（重要）

各ファイルから他のファイルを参照するときのパスルール:

### index.html から
```html
<!-- 詳細ページへ -->
<a href="src/pages/about.html">活動概要</a>

<!-- 写真 -->
<img src="picture/ファイル名.jpg">

<!-- PDF -->
<a href="deta/ファイル名.pdf">ダウンロード</a>
```

### src/pages/*.html から
```html
<!-- ホームへ -->
<a href="../index.html">ホーム</a>

<!-- 同じページフォルダ内の別ページへ -->
<a href="news.html">ニュース</a>

<!-- CSS・JS -->
<link rel="stylesheet" href="../assets/css/style.css">
<script src="../assets/js/main.js"></script>

<!-- 写真 (pictureフォルダ) -->
<img src="../../picture/ファイル名.jpg">

<!-- PDF (detaフォルダ) -->
<a href="../../deta/ファイル名.pdf">ダウンロード</a>
```

---

## ページの追加方法

### 1. 新しいページを作る
```
src/pages/新しいページ名.html を作成
```

ページのテンプレート:
```html
<!DOCTYPE html>
<!--
================================================================
  UMEZOME - ページタイトル
  ファイル: src/pages/新しいページ名.html
  【このページについて】
    ※ 説明を記入
================================================================
-->
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ページタイトル | UMEZOME - 智学館中等教育学校 梅染め探究 PBL</title>
  <meta name="description" content="ページの説明">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✿</text></svg>">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>

  <!-- ヘッダー (他のページからコピー・activeクラスを調整) -->
  <header class="site-header" id="site-header">
    <div class="header-inner">
      <a href="../index.html" class="site-logo">
        <span class="site-logo__en">UMEZOME</span>
        <span class="site-logo__ja">智学館中等教育学校 梅染め探究 PBL</span>
      </a>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="メニューを開閉する" aria-expanded="false" aria-controls="nav-menu">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav-menu" id="nav-menu" role="navigation" aria-label="メインナビゲーション">
        <a href="about.html"            class="nav-menu__link">活動概要</a>
        <a href="news.html"             class="nav-menu__link">ニュース</a>
        <a href="events.html"           class="nav-menu__link">イベント</a>
        <a href="blog.html"             class="nav-menu__link">ブログ</a>
        <a href="products.html"         class="nav-menu__link">製品</a>
        <a href="achievements.html"     class="nav-menu__link">実績</a>
        <a href="documents.html"        class="nav-menu__link">資料</a>
        <a href="../index.html#contact" class="nav-cta nav-menu__link">お問い合わせ</a>
        <!-- ↑ 現在のページのリンクに class="nav-menu__link active" を追加 -->
      </nav>
    </div>
  </header>

  <main id="main-content">

    <!-- ページヘッダー -->
    <div class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="パンくずリスト">
          <a href="../index.html">ホーム</a>
          <span class="breadcrumb__separator" aria-hidden="true">›</span>
          <span aria-current="page">ページタイトル</span>
        </nav>
        <p class="section-eyebrow">English Label</p>
        <h1 class="page-header__title">ページタイトル</h1>
        <p class="page-header__lead">説明文</p>
      </div>
    </div>

    <!-- コンテンツセクション -->
    <section class="section">
      <div class="container">
        <!-- ここにコンテンツを書く -->
      </div>
    </section>

  </main>

  <!-- フッター (他のページからコピー) -->
  <footer class="site-footer">
    <!-- ... (他のページからコピー) ... -->
  </footer>

  <button class="back-to-top" id="back-to-top" aria-label="ページトップへ戻る">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  </button>
  <script src="../assets/js/main.js"></script>
</body>
</html>
```

### 2. ナビゲーションにリンクを追加
全ページの `<nav class="nav-menu">` 内に:
```html
<a href="新しいページ名.html" class="nav-menu__link">ページ名</a>
```
フッターの `footer-col__links` にも追加してください。

---

## よく使うCSSクラス

### レイアウト
| クラス | 説明 |
|--------|------|
| `.container` | 中央揃えの幅制限ボックス |
| `.section` | セクション（上下パディング自動） |
| `.section--alt` | 薄いピンク背景のセクション |
| `.section--dark` | ダーク背景のセクション |
| `.grid-2` | 2列グリッド |
| `.grid-3` | 3列グリッド |
| `.grid-4` | 4列グリッド |

### コンポーネント
| クラス | 説明 |
|--------|------|
| `.card` | 汎用カードコンポーネント |
| `.event-card` | イベント用カード |
| `.product-card` | 製品カード |
| `.doc-card` | 資料ダウンロードカード |
| `.award-card` | 実績・受賞カード |
| `.faq__item` | FAQアコーディオン (details/summary) |
| `.btn.btn--primary` | プライマリボタン（ピンク） |
| `.btn.btn--outline` | アウトラインボタン |
| `.tag` | タグラベル |
| `.photo-gallery` | フォトギャラリーグリッド |
| `.news__list / .news__item` | ニュース・タイムラインリスト |
| `.process-steps / .process-step` | 製造工程ステップ |

### アニメーション
| クラス | 説明 |
|--------|------|
| `.animate` | スクロールで表示されるアニメーション |
| `.animate-delay-1` 〜 `.animate-delay-5` | 遅延 (0.1s〜0.5s) |

---

## 写真の追加・変更

1. JPGまたはPNG形式の写真を `picture/` フォルダに入れる
   - HEIC/HEIFはブラウザで表示できないので変換が必要
   - macOS: プレビュー > 書き出し で JPG に変換
2. HTMLで以下のように記述:

```html
<!-- index.html から参照する場合 -->
<img
  src="picture/ファイル名.jpg"
  alt="写真の説明文"    <!-- スクリーンリーダー用。必ず書いてください -->
  loading="lazy"       <!-- 遅延読み込み（ページ表示速度改善） -->
>

<!-- src/pages/ 内のファイルから参照する場合 -->
<img
  src="../../picture/ファイル名.jpg"
  alt="写真の説明文"
  loading="lazy"
>
```

---

## ブラウザでの確認方法

1. `index.html` をダブルクリックでブラウザで開く
2. または VS Code の「Live Server」拡張機能を使用（推奨）
   - Live Server を使うと、ファイルを保存するたびに自動更新される

> ⚠️ `file://` プロトコルで開くと、一部のブラウザでフォントが読み込めないことがあります。
> Live Serverを使うと問題が解決します。

---

## カラーテーマの変更

`src/assets/css/style.css` のファイル先頭にある `:root` ブロックを編集:

```css
:root {
  /* メインカラー: 梅の花ピンク → 変更するとサイト全体に反映 */
  --color-plum-500: hsl(340, 52%, 52%);
  /*                     ↑   ↑     ↑
                         色相 彩度  明度
                  赤=0, 緑=120, 青=240, ピンク=340 */
}
```

現在: ピンク〜ロゼ系（梅の花カラー）

---

## AIへの引継ぎ情報

このサイトは以下の設計原則で作られています:
- **純粋なHTML/CSS/JS**: フレームワーク不使用。ファイルを開くだけで動作
- **グラスモーフィズム**: `backdrop-filter: blur()` を使った透明感のあるUI
- **モジュール式JS**: `main.js` は機能ごとに関数化。追加は関数を定義して `DOMContentLoaded` 内で呼び出す
- **1CSSファイル管理**: 全スタイルは `style.css` のみ。セクション番号で整理
- **コメント充実**: 各HTMLには追加・変更方法をコメントで記述
- **BEMライクな命名**: `.block__element--modifier` 形式のクラス名

---

*このサイトは智学館中等教育学校 PBL梅染めグループが作成しました。*  
*作成日: 2024年10月 / 最終更新: 2026年10月*
