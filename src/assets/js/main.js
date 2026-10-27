/**
 * ================================================================
 *  UMEZOME - 智学館中等教育学校 梅染め探究 PBL
 *  メインJavaScriptファイル
 * ================================================================
 *
 *  ファイル: src/assets/js/main.js
 *  説明: サイト全体で使う共通機能をまとめています。
 *        モジュール形式で、機能ごとに関数に分かれています。
 *
 *  目次:
 *    1. ヘッダースクロール制御
 *    2. ハンバーガーメニュー
 *    3. スクロールアニメーション
 *    4. ヒーロースライドショー
 *    5. ページトップへ戻るボタン
 *    6. モーダル制御
 *    7. スムーススクロール
 *    8. アクティブナビ更新
 *    9. 初期化(DOMContentLoaded)
 *
 *  ================================================================
 *  【使い方メモ】
 *    - 新しいページを作る時: <script src="../assets/js/main.js"></script>
 *      で読み込むだけでOKです。
 *    - ページ固有の機能は別ファイル(例: blog.js)に書いてください。
 *  ================================================================
 */

'use strict';

/* ============================================================
   1. ヘッダースクロール制御
   スクロールしたらヘッダーに .scrolled クラスを追加します
============================================================ */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return; // ヘッダーがなければ何もしない

  const SCROLL_THRESHOLD = 80; // この px 以上スクロールしたら透過解除

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初回実行（リロード時にすでにスクロール済みの場合を考慮）
}

/* ============================================================
   2. ハンバーガーメニュー
   モバイル時のナビを開閉します
============================================================ */
function initHamburgerMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navMenu   = document.querySelector('.nav-menu');

  if (!hamburger || !navMenu) return;

  // ハンバーガーボタンをクリック
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active', isOpen);
    // アクセシビリティ: メニューの開閉状態をスクリーンリーダーに伝える
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    // メニュー開放中はbodyのスクロールを止める
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // メニュー内のリンクをクリックしたらメニューを閉じる
  navMenu.querySelectorAll('.nav-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // 背景(nav-menu外)クリックで閉じる
  navMenu.addEventListener('click', (e) => {
    if (e.target === navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   3. スクロールアニメーション
   .animate クラスの要素が画面内に入ったらアニメーション開始
   CSSの .animated クラスが適用されます
============================================================ */
function initScrollAnimation() {
  const elements = document.querySelectorAll('.animate');
  if (!elements.length) return;

  // IntersectionObserver: 要素が画面に入ったか監視する効率的な方法
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          // 一度アニメーションが起きたら監視を停止（パフォーマンス向上）
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,   // 要素の10%が見えたらトリガー
      rootMargin: '0px 0px -40px 0px' // 下側40pxの余裕を持たせる
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   4. ヒーロースライドショー
   .hero__slide を自動で切り替えます
   設定: INTERVAL_MS でインターバルを変更
============================================================ */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero__slide');
  if (slides.length < 2) return; // スライドが2枚未満なら何もしない

  const INTERVAL_MS = 5000; // スライド切り替え間隔 (ms)
  let currentIndex  = 0;
  let timer         = null;

  /**
   * 指定インデックスのスライドを表示する
   * @param {number} index - 表示するスライドのインデックス
   */
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  /** 次のスライドを表示する */
  function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  // 自動再生開始
  function startAutoplay() {
    timer = setInterval(nextSlide, INTERVAL_MS);
  }

  // 最初のスライドを表示してから開始
  showSlide(0);
  startAutoplay();

  // ページ非表示時は自動再生を一時停止（バッテリー節約）
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      startAutoplay();
    }
  });
}

/* ============================================================
   5. ページトップへ戻るボタン
   一定スクロール後に .back-to-top ボタンを表示します
============================================================ */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  const SHOW_THRESHOLD = 400; // この px 以上スクロールしたら表示

  function onScroll() {
    btn.classList.toggle('visible', window.scrollY > SHOW_THRESHOLD);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   6. モーダル制御
   .modal-trigger をクリックするとモーダルを開きます
   閉じ方: × ボタン / オーバーレイクリック / Escape キー
============================================================ */
function initModals() {
  /**
   * モーダルを開く汎用関数
   * @param {HTMLElement} overlay - .modal-overlay 要素
   */
  function openModal(overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // スクロール防止
    // フォーカスをモーダル内に移動（アクセシビリティ）
    const firstFocusable = overlay.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
  }

  /**
   * モーダルを閉じる汎用関数
   * @param {HTMLElement} overlay - .modal-overlay 要素
   */
  function closeModal(overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // 各モーダルトリガーを設定
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.dataset.modalTarget;
      const overlay  = document.getElementById(targetId);
      if (overlay) openModal(overlay);
    });
  });

  // 閉じるボタン
  document.querySelectorAll('.modal-close, [data-modal-close]').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const overlay = closeBtn.closest('.modal-overlay');
      if (overlay) closeModal(overlay);
    });
  });

  // オーバーレイクリックで閉じる
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Escape キーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(overlay => {
        closeModal(overlay);
      });
    }
  });
}

/* ============================================================
   7. スムーススクロール
   href="#..." のリンクをクリックした時にスムーズにスクロール
   ヘッダーの高さを考慮してオフセットを設定します
============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return; // "#" のみは無視

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // ヘッダーの高さを取得してオフセット
      const header = document.querySelector('.site-header');
      const offset = header ? header.offsetHeight + 16 : 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   8. アクティブナビ更新
   現在表示中のセクションに対応するナビリンクに active クラスを付与
============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu__link[href]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}` ||
                             link.getAttribute('href')?.endsWith(`/${id}`) ||
                             (link.pathname === window.location.pathname && id === 'top');
            link.classList.toggle('active', isActive);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   9. 初期化 (DOMContentLoaded)
   ページ読み込み完了後に全機能を初期化します
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();      // 1. ヘッダースクロール
  initHamburgerMenu();     // 2. ハンバーガーメニュー
  initScrollAnimation();   // 3. スクロールアニメーション
  initHeroSlideshow();     // 4. ヒーロースライドショー
  initBackToTop();         // 5. ページトップへ戻る
  initModals();            // 6. モーダル
  initSmoothScroll();      // 7. スムーススクロール
  initActiveNav();         // 8. アクティブナビ
  
  console.log('✿ UMEZOME サイト初期化完了');
});

// 共通コンポーネント(header/footer)がFetch APIで挿入された後の再初期化
document.addEventListener('componentsLoaded', () => {
  initHeaderScroll();
  initHamburgerMenu();
  initSmoothScroll();
  initActiveNav();
});

