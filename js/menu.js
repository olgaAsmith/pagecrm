document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('header-open-menu');
  const menu = document.getElementById('header-menu');
  const arrow = document.getElementById('header-arrow');
  
  menuButton.addEventListener('click', () => {
    menu.classList.toggle('header__line--opened');
    arrow.classList.toggle('header__arrow--opened');
  });
});
