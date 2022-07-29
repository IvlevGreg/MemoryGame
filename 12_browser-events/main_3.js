const btnScrollUp = document.getElementById('scroll-up')

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    btnScrollUp.classList.add('btn-scroll-up--active')
  } else {
    btnScrollUp.classList.remove('btn-scroll-up--active')
  }
},{ passive: true })

btnScrollUp.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})