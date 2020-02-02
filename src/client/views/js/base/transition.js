const items = document.querySelectorAll('.animate-on-scroll');

const itemOptions = {
  threshold: 0.10,
  rootMargin: '0px 0px 180px 0px',
};

const itemObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    const { target, isIntersecting } = entry;

    if (!isIntersecting) return;

    target.classList.toggle('animate');
    observer.unobserve(target);
  });
}, itemOptions);

if (items) {
  items.forEach(item => itemObserver.observe(item));
}
