document.addEventListener('astro:page-load', () => {
  const hamburgerEle = document.querySelector('.hamburger')
  /** hamburger */
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

  /** back to top */
  const backToTopEle = document.querySelector('.back-to-top')
  const rootElement = document.documentElement
  backToTopEle?.addEventListener('click', () => {
    rootElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })

  const handleScroll = () => {
    // Do something on scroll
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    if (rootElement.scrollTop / scrollTotal > 0.3) {
      // Show button
      backToTopEle?.classList.add('show')
    } else {
      // Hide button
      backToTopEle?.classList.remove('show')
    }
  }

  document.addEventListener('scroll', handleScroll, { passive: true })
})
