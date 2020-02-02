const backToTopBtn = document.querySelector('.back-to-top-btn');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      if (!backToTopBtn.classList.contains('btn-enter')) {
        backToTopBtn.classList.add('btn-enter');
        backToTopBtn.classList.remove('btn-exit');
        if (backToTopBtn.style.display) {
          backToTopBtn.removeAttribute('style');
        }
      }
    } else if (!backToTopBtn.classList.contains('btn-exit')) {
      backToTopBtn.classList.add('btn-exit');
      backToTopBtn.classList.remove('btn-enter');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });
}
