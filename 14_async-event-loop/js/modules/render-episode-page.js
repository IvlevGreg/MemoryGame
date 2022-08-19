import loadResource from './load-resource.js'
import createEpisode from './create-episode.js'

 function renderEpisodePage(data, episode, linkArray, container) {
  Promise.all (linkArray.map(src => loadResource(src)))
    .then((links) => {
      // 
      const planetsArray = []
      const speciesArray = []
      links.forEach(e => {
        if(e.diameter) {
          planetsArray.push(e)
        }
        if(e.homeworld) {
          speciesArray.push(e)
        }
      })
    container.innerHTML = '';
    container.append(createEpisode(data, episode, planetsArray, speciesArray))
    window.addEventListener('popstate', (e) => {
      // e.preventDefault()
      if(document.location.pathname.includes('episode')) {
        console.log(episode)
        container.innerHTML = '';
        container.append(createEpisode(data, episode, planetsArray, speciesArray))
      }
    })
    })
}

export default renderEpisodePage