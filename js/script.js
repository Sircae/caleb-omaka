// Mobile menu
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}));

// YouTube thumbnails: fall back to a smaller size, then hide the image
document.querySelectorAll('img[data-yt]').forEach(img => {
  const fallback = () => {
    if (!img.dataset.tried) {
      img.dataset.tried = '1';
      img.src = 'https://i.ytimg.com/vi/' + img.dataset.yt + '/hqdefault.jpg';
    } else {
      img.style.display = 'none';
    }
  };
  img.addEventListener('error', fallback);
  if (img.complete && img.naturalWidth === 0) fallback();
});

// Reveal on scroll
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  items.forEach(el => io.observe(el));
} else {
  items.forEach(el => el.classList.add('in'));
}

document.getElementById('year').textContent = new Date().getFullYear();
