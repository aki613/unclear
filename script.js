
// ハンバーガー → バツ アニメーション

const hamburger   = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');

hamburger.addEventListener('click', () => {
  const isOpen = menuOverlay.classList.toggle('open');
  hamburger.classList.toggle('is-open', isOpen);
});
// =====================
// ホームスライドショー
// =====================
const slideshow = document.querySelector('.slideshow');

if (slideshow) {
  const NUM_PHOTOS =15;
  const INTERVAL = 5000; // 切り替え間隔（ミリ秒）3秒

  // 画像を全部生成
  const slides = [];
  for (let i = 1; i <= NUM_PHOTOS; i++) {
    const num = String(i).padStart(2, '0');
    const slide = document.createElement('div');
    slide.className = 'slide';
    const img = document.createElement('img');
    img.src = `images/gallery_image/photo_${num}.jpg`;
    img.alt = '';
    slide.appendChild(img);
    slideshow.appendChild(slide);
    slides.push(slide);
  }

  let current = 0;
  slides[0].classList.add('active');

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, INTERVAL);
}
// =====================
// ページ遷移 ディゾルブ
// =====================
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    // 外部リンクや#は除外
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    e.preventDefault();
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = href;
    }, 400);
  });
});

// オーバーレイ背景クリックで閉じる
menuOverlay.addEventListener('click', function(e) {
  if (e.target === this) {
    menuOverlay.classList.remove('open');
    hamburger.classList.remove('is-open');
  }
});

// =====================
// ギャラリー（gallery.htmlのみ実行）
// =====================
const grid = document.getElementById('galleryGrid');

if (grid) {
  const NUM_PHOTOS = 15;

  for (let i = NUM_PHOTOS; i >= 1; i--) {
  // 昇順にしたい時は----for (let i = NUM_PHOTOS; i >= 1; i--) {
    const num = String(i).padStart(2, '0');
    const el = document.createElement('div');
    el.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = `images/gallery_image/photo_${num}.jpg`;
    img.alt = '';
    el.appendChild(img);
    el.addEventListener('click', () => openLightbox(num));
    grid.appendChild(el);
  }

  function openLightbox(num) {
    const lightbox = document.getElementById('lightbox');
    lightbox.innerHTML = '';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lb-close';
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));

    const img = document.createElement('img');
    img.src = `images/gallery_image/photo_${num}.jpg`;
    img.className = 'lb-img';

    lightbox.appendChild(closeBtn);
    lightbox.appendChild(img);
    lightbox.classList.add('open');
  }

  document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('open');
  });
}