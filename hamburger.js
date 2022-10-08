const menu = document.querySelector('.hamburger');
const link = document.querySelector('#link');

menu.addEventListener('click', () => {
   menu.classList.toggle('active');
   link.classList.toggle('showlink');
})
