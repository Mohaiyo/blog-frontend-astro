const hamburgerEle = document.querySelector('.hamburger')

if (hamburgerEle) {
  document.addEventListener('astro:page-load', () => {
    document.querySelector('.hamburger')?.addEventListener('click', () => {
      document.querySelector('.header-nav')?.classList.toggle('expanded')
    })
    document.querySelector('.site-mobile-nav__close-icon')?.addEventListener('click', () => {
      document.querySelector('.header-nav')?.classList.toggle('expanded')
    })
  })
}
