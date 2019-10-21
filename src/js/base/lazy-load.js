// Source from Kevin Powell: https://www.youtube.com/watch?v=mC93zsEsSrg

const images = document.querySelectorAll('[data-lazy]');

const preloadImage = img => {
  const src = img.getAttribute('data-lazy');
  if (!src) return;

  img.src = src;
  img.removeAttribute('data-lazy');
};

const imgOptions = {
  threshold: 0,
  rootMargin: '0px 0px 500px 0px',
};

const imgObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    preloadImage(entry.target);
    observer.unobserve(entry.target);
  });
}, imgOptions);

images.forEach(image => imgObserver.observe(image));
