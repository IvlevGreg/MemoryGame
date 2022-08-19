import loadResource from './load-resource.js'
import createAllEpisodesList from './create-all-episodes-list.js'

 function renderMainPage(linkArray, container) {
  Promise.all (linkArray.map(src => loadResource(src)))
    .then(([pageModule, data]) => {
      clearAndCreate(data, container)
      
      window.addEventListener('popstate', (e) => {
        // e.preventDefault()
        if(document.location.pathname === '/' || 
          document.location.pathname === '') {
         clearAndCreate(data, container)
        }
        if(document.querySelector('.js-btn-back')) {
          document.querySelector('.js-btn-back').addEventListener('click', () => {
            clearAndCreate(data, container)
          })
        }
      })
    })
}

function clearAndCreate(data, container) {
  container.innerHTML = '';
  container.append(createAllEpisodesList(data, container))
}

export default renderMainPage