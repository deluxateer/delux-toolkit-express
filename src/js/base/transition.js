const items = document.querySelectorAll('[data-animate]');

const animateItem = item => {
  const shouldAnimate = item.getAttribute('data-animate');
  if (shouldAnimate == null) return;

  item.classList.add('animate');
  item.removeAttribute('data-animate');
};

const itemOptions = {
  threshold: 0.10,
  rootMargin: '0px 0px 180px 0px',
};

const itemObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    animateItem(entry.target);
    observer.unobserve(entry.target);
  });
}, itemOptions);

if (items) {
  items.forEach(item => itemObserver.observe(item));
}
