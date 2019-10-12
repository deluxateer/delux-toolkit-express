const backToTopBtn = document.querySelector('.back-to-top-btn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    if (!backToTopBtn.classList.contains('btn-enter')) {
      backToTopBtn.classList.add('btn-enter');
      backToTopBtn.classList.remove('btn-exit');
      backToTopBtn.style.display = 'inline-block';
    }
  } else if (!backToTopBtn.classList.contains('btn-exit')) {
    backToTopBtn.classList.add('btn-exit');
    backToTopBtn.classList.remove('btn-enter');
    setTimeout(() => {
      backToTopBtn.style.display = 'none';
    }, 300);
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });
}
