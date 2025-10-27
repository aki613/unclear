// ===============================
// 共通スクリプト（ローダー + ハンバーガー + Lightbox）
// ===============================
document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------
     ローダー（Home 用）:
     window.load を使ってページ読み込み完了を待つ
  ------------------------ */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader'); // HTMLにある場合のみ
    if (loader) {
      // ロゴ表示 → 少し待ってから上スライドで消す
      setTimeout(() => {
        loader.classList.add('hide'); // CSSで .hide にスライド定義
        // アニメ終了後に完全に削除
        setTimeout(() => {
          loader.remove();
        }, 1000);
      }, 1500); // 表示時間（必要なら変更）
    }
  });

  /* ------------------------
     ハンバーガー（開閉）
  ------------------------ */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav-menu');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // メニュー内リンクで閉じる（ある場合）
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // ===============================
  // Home スライドショー（.main-visual）
  // ===============================
  const slides = document.querySelectorAll(".main-visual .slide");
  let currentIndex = 0;
  const slideInterval = 5000; // 5秒ごとに切り替え

  if (slides.length > 1) {
    slides[currentIndex].classList.add("active");

    setInterval(() => {
      slides[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add("active");
    }, slideInterval);
  }


  /* ------------------------
     Lightbox（ギャラリー拡大）
     — 安全チェックを入れてエラー回避
  ------------------------ */
  const galleryImages = document.querySelectorAll('.masonry img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');

  // 存在しない要素に対して addEventListener を呼ばない
  if (galleryImages && galleryImages.length && lightbox && lightboxImg) {

    // 画像クリックで開く
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        document.body.style.overflow = 'hidden'; // 背景スクロール禁止
      });
    });

    // ✖ が存在するならイベントを付ける（なければ背景クリックのみで閉じる）
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
      });
    }

    // 背景クリックで閉じる
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

});

// 画像クリックで開く
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('show');
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    document.body.style.overflow = 'hidden';
  });
});

// 閉じる
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('show');
    setTimeout(() => lightbox.style.display = 'none', 500);
    document.body.style.overflow = '';
  });
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
    setTimeout(() => lightbox.style.display = 'none', 500);
    document.body.style.overflow = '';
  }
});