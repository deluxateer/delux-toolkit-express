const track = document.querySelector('.carousel-track');

if (track) {
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.carousel-button-left');
  const nextButton = document.querySelector('.carousel-button-right');
  const carouselNav = document.querySelector('.carousel-nav');
  const navItems = Array.from(carouselNav.children);
  
  const slideWidth = slides[0].getBoundingClientRect().width;
  
  const moveToSlide = (currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('carousel-slide-current');
    targetSlide.classList.add('carousel-slide-current');
  };
  
  const updateNavItems = (currNavItem, targetNavItem) => {
    currNavItem.classList.remove('carousel-indicator-current');
    targetNavItem.classList.add('carousel-indicator-current');
  };
  
  // arrange the slides next to one another
  const setSlidePosition = (slide, index) => { slide.style.left = `${slideWidth * index}px`; };
  
  slides.forEach(setSlidePosition);
  
  // initialize the current slide and nav indicator on page load
  slides[0].classList.add('carousel-slide-current');
  navItems[0].classList.add('carousel-indicator-current');
  
  const currSlide = document.querySelector('.carousel-slide-current');
  if (currSlide !== slides[0]) {
    moveToSlide(slides[0], currSlide);
  }
  
  // when I click right, move slides to the right
  nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.carousel-slide-current');
    const currNavItem = carouselNav.querySelector('.carousel-indicator-current');
  
    // if at the end of the carousel, bring back to beginning
    if (currentSlide === slides[slides.length - 1]) {
      moveToSlide(currentSlide, slides[0]);
      updateNavItems(currNavItem, navItems[0]);
    } else {
      const nextSlide = currentSlide.nextElementSibling;
      const nextNavItem = currNavItem.nextElementSibling;
  
      moveToSlide(currentSlide, nextSlide);
      updateNavItems(currNavItem, nextNavItem);
    }
  });
  
  // when I click left, move slides to the left
  prevButton.addEventListener('click', () => {
    const currentSlide = document.querySelector('.carousel-slide-current');
    const currNavItem = carouselNav.querySelector('.carousel-indicator-current');
  
    // if at the beginning of the carousel, bring to the end of it
    if (currentSlide === slides[0]) {
      moveToSlide(currentSlide, slides[slides.length - 1]);
      updateNavItems(currNavItem, navItems[navItems.length - 1]);
    } else {
      const prevSlide = currentSlide.previousElementSibling;
      const prevNavItem = currNavItem.previousElementSibling;
  
      moveToSlide(currentSlide, prevSlide);
      updateNavItems(currNavItem, prevNavItem);
    }
  });
  
  // when I click the nav indicators, move to that slide
  carouselNav.addEventListener('click', e => {
    const targetNavItem = e.target.closest('button');
  
    if (!targetNavItem) return;
  
    const currentSlide = track.querySelector('.carousel-slide-current');
    const currNavItem = carouselNav.querySelector('.carousel-indicator-current');
    const targetIndex = navItems.findIndex(item => item === targetNavItem);
    const targetSlide = slides[targetIndex];
  
    moveToSlide(currentSlide, targetSlide);
    updateNavItems(currNavItem, targetNavItem);
  });
}
