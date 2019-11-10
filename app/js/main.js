function hideMenuPanel() {
  const menulinkPanel = document.querySelector('.js-menuLinkPanel');
  menulinkPanel.classList.toggle('show');
}

(function() {
  const mobileMenu = document.querySelector('.js-mobileMenu');
  mobileMenu.addEventListener('click', hideMenuPanel);
})()
