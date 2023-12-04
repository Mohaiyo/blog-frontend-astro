const hamburgerEle = document.querySelector('.hamburger')

if (hamburgerEle) {
  document.addEventListener('astro:page-load', () => {
    document.querySelector('.hamburger')?.addEventListener('click', () => {
      document.querySelector('.header-nav')?.classList.toggle('expanded')
    })
    document.querySelector('.site-mobile-nav__close-icon')?.addEventListener('click', () => {
      document.querySelector('.header-nav')?.classList.toggle('expanded')
    })

    document.addEventListener('click', function (event: Event) {
      if (document.querySelector('.header-nav')?.classList.contains('expanded')) {
        const elem = document.querySelector('.site-mobile-nav')
        const hamburgerEle = document.querySelector('.hamburger')
        if (event.target && !hamburgerEle?.contains(event.target as Node)) {
          const outsideClick = !elem?.contains(event.target as Node)
          if (outsideClick) {
            console.log('outsideClick', outsideClick)
            document.querySelector('.header-nav')?.classList.remove('expanded')
          }
        }
      }
    })
  })
}
