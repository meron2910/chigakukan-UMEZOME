/**
 * ================================================================
 *  UMEZOME - 共通コンポーネントローダー
 *  ファイル: src/assets/js/components.js
 * ================================================================
 *
 *  【このファイルの役割】
 *  全ページ共通の「ヘッダー（header.html）」と「フッター（footer.html）」を
 *  JavaScript の Fetch API（フェッチAPI）を使って読み込み、
 *  各ページの指定された場所（プレースホルダー）に自動で挿入します。
 *
 *  【重要：動作環境について】
 *  Fetch API はセキュリティ上のルール（CORS制限）により、
 *  ファイルを直接ダブルクリック（file:// で開く）した状態では動作しません。
 *  VS Code の拡張機能「Live Server」や、ローカルWebサーバー環境を使って
 *  http://localhost:... のアドレスで開いてください。
 *
 *  【仕組みの流れ】
 *  1. 各ページにある <div id="site-header-placeholder"></div> を探す
 *  2. Fetch API で src/components/header.html を取得する
 *  3. 取得したHTMLを placeholder の中に挿入する
 *  4. 現在のページが「ルート（index.html）」か「src/pages/」かを判定し、
 *     リンクのURL（href）を適切な相対パスに自動調整する
 *  5. 現在開いているページに対応するメニューに「active」クラスを付与する
 *  6. ヘッダーのハンバーガーメニューやスクロール制御などの機能を起動する
 *
 * ================================================================
 */

'use strict';

/**
 * 1. 現在のページ階層とファイル名を判定する関数
 * @returns {Object} { isRoot: boolean, currentPage: string, relativeRoot: string }
 */
function getPageContext() {
  const path = window.location.pathname;

  // URLからファイル名を取得 (例: "about.html", "index.html")
  const pageFile = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // src/pages/ ディレクトリ内にいるかどうか判定
  const isInPages = path.includes('/src/pages/') ||
                    path.includes('/pages/') ||
                    (pageFile !== 'index.html' && !path.endsWith('/'));

  // ページ名（拡張子なし）
  let pageName = pageFile.replace('.html', '');
  if (pageName === '' || pageName === 'index') {
    pageName = 'home';
  }

  // ルートディレクトリへの相対パス
  // - ルート(index.html)から見ると: "" (そのまま)
  // - src/pages/ から見ると: "../" (1つ上のディレクトリ)
  const relativeRoot = isInPages ? '../' : './';

  // components フォルダへの相対パス
  const componentsPath = isInPages ? '../components/' : 'src/components/';

  return {
    isRoot: !isInPages,
    currentPage: pageName,
    relativeRoot: relativeRoot,
    componentsPath: componentsPath
  };
}

/**
 * 2. HTMLファイルを非同期で取得して指定要素に挿入する関数 (Fetch API)
 * @param {string} targetSelector 挿入先の要素のCSSセレクタ (例: '#site-header-placeholder')
 * @param {string} filePath 読み込むHTMLファイルのパス (例: 'src/components/header.html')
 * @returns {Promise<boolean>} 成功したら true
 */
async function loadComponent(targetSelector, filePath) {
  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) {
    // 挿入先がこのページになければスキップ
    return false;
  }

  try {
    // Fetch API で外部HTMLファイルを取得
    const response = await fetch(filePath);

    // 読み込み失敗（404など）のチェック
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} (${filePath})`);
    }

    // 取得したHTMLテキスト
    const htmlText = await response.text();

    // プレースホルダーの中に挿入
    targetElement.innerHTML = htmlText;
    return true;

  } catch (error) {
    console.error(`✿ コンポーネント読み込みエラー [${filePath}]:`, error);
    targetElement.innerHTML = `
      <div style="padding: 12px; background: #fff0f0; color: #d32f2f; font-size: 13px; text-align: center; border-bottom: 1px solid #ffcdd2;">
        【注意】ヘッダー/フッターの読み込みに失敗しました。
        ブラウザで直接ファイルを開いている場合(file://)は、Live Server等のWebサーバー環境で開いてください。
      </div>
    `;
    return false;
  }
}

/**
 * 3. 読み込まれたリンク（<a>タグ）のパスを現在の階層に合わせて補正する関数
 * @param {Object} context getPageContext() の結果
 */
function fixComponentLinks(context) {
  const { isRoot, currentPage } = context;

  // 対象となるすべてのリンクを処理
  const links = document.querySelectorAll('#site-header a, #site-footer a');

  links.forEach(link => {
    const pageAttr = link.getAttribute('data-page');

    // ロゴリンク（トップへ戻る）の調整
    if (link.id === 'header-logo' || link.id === 'footer-logo') {
      link.href = isRoot ? 'index.html' : '../index.html';
      return;
    }

    // data-page 属性によるリンク先の設定
    if (pageAttr) {
      if (pageAttr === 'contact') {
        // お問い合わせ（index.html の #contact セクションへ）
        link.href = isRoot ? '#contact' : '../index.html#contact';
      } else {
        // 各サブページへのリンク
        if (isRoot) {
          // トップページから各ページへ: src/pages/xxx.html
          link.href = `src/pages/${pageAttr}.html`;
        } else {
          // サブページ同士の移動: xxx.html (同じディレクトリ内)
          link.href = `${pageAttr}.html`;
        }
      }

      // 現在開いているページに active クラスを付与
      if (pageAttr === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    }
  });
}

/**
 * 4. ヘッダーの操作イベント（ハンバーガーメニュー・スクロール）を初期化
 * main.js の関数が存在する場合はそれを呼び出し、無ければ安全に自前で初期化
 */
function setupHeaderInteractions() {
  // main.js の initHeaderScroll が存在すれば呼ぶ
  if (typeof initHeaderScroll === 'function') {
    initHeaderScroll();
  } else {
    // 独自フォールバック
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  }

  // main.js の initHamburgerMenu が存在すれば呼ぶ
  if (typeof initHamburgerMenu === 'function') {
    initHamburgerMenu();
  }

  // main.js の initSmoothScroll が存在すれば呼ぶ
  if (typeof initSmoothScroll === 'function') {
    initSmoothScroll();
  }
}

/**
 * 5. 全コンポーネントの初期化実行
 */
async function initComponents() {
  const context = getPageContext();

  // 1. ヘッダーの読み込み
  const headerPath = `${context.componentsPath}header.html`;
  const headerLoaded = await loadComponent('#site-header-placeholder', headerPath);

  // 2. フッターの読み込み
  const footerPath = `${context.componentsPath}footer.html`;
  const footerLoaded = await loadComponent('#site-footer-placeholder', footerPath);

  // 3. リンクのパス調整と active クラス付与
  if (headerLoaded || footerLoaded) {
    fixComponentLinks(context);
  }

  // 4. ヘッダーのインタラクション（ハンバーガー・スクロール等）を登録
  if (headerLoaded) {
    setupHeaderInteractions();
  }

  // 完了イベントを発火（他スクリプトから検知可能にする）
  document.dispatchEvent(new CustomEvent('componentsLoaded', { detail: context }));
  console.log(`✿ 共通コンポーネント読み込み完了 (ページ: ${context.currentPage})`);
}

// DOM読み込み完了時に実行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents);
} else {
  // すでにDOMが読み込まれている場合は即時実行
  initComponents();
}
