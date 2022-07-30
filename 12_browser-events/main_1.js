const modal = document.getElementById('modal')

  modal.addEventListener('click', (e) => {
    if(e.target === modal) {
      modal.classList.remove('modal--active')
    }
  })
    

document.getElementById('btn-open').addEventListener('click', 
  () => {
    modal.classList.add('modal--active')
  })

  