const navSubMenu = document.querySelector('.navbar-submenu');
const navbarBtn = document.querySelector('.navbar-toggle');

// navSubMenu.style.display = 'none';

// navbarBtn.addEventListener('click', () => {
//   if (!navSubMenu.classList.contains('navbar-active')) {
//     navSubMenu.style.display = 'block';
//     navSubMenu.classList.add('navbar-active');
//   } else {
//     navSubMenu.classList.remove('navbar-active');
//     setTimeout(() => {
//       navSubMenu.style.display = 'none';
//     }, 250);
//   }
// });

navbarBtn.addEventListener('click', () => navSubMenu.classList.toggle('navbar-active'));
