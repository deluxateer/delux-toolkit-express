const navSubMenu = document.querySelector('.navbar-submenu');
const navbarBtn = document.querySelector('.navbar-toggle');

navbarBtn.addEventListener('click', () => navSubMenu.classList.toggle('navbar-active'));
