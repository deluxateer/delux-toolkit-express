const navSubMenu = document.querySelector('.navbar-submenu');
const navbarBtn = document.querySelector('.navbar-toggle');

if (navSubMenu && navbarBtn) {
  navbarBtn.addEventListener('click', () => navSubMenu.classList.toggle('navbar-active'));
}

// intended to disable navbar collapse animation on resize
/*
const classes = document.body.classList;
let timer = 0;
window.addEventListener('resize', () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  } else {
    classes.add('stop-transitions');
  }

  timer = setTimeout(() => {
    classes.remove('stop-transitions');
    timer = null;
  }, 100);
});
*/
