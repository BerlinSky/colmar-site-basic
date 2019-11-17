const toggleMobileMenu = () => {
  const elems = document.querySelectorAll('.js-mobileMenu__image--item');
  [...elems].forEach(elem => {
    elem.classList.toggle('show')
  })
}

const hideMenuPanel = () => {
  const elem = document.querySelector('.js-menuLinkPanel');
  elem.classList.toggle('show');
}

const toggleMobileMenuElements = () => {
  toggleMobileMenu();
  hideMenuPanel();
}

(function() {
  const mobileMenu = document.querySelector('.js-mobileMenu');

  mobileMenu ?  mobileMenu.addEventListener('click', toggleMobileMenuElements): "";
})()
